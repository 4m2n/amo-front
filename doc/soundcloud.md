# Soundcloud repository

## Problem

In this project we use the
[Soundcloud WIdget API](https://developers.soundcloud.com/docs/api/html5-widget)
so we can programatically interact with their embeddable player iframe. That
way, we can create our own user interface to interact with the player, rather
than using the Soundcloud one which comes with it's design and constrains.

In order to use the API, it should first be initialized using the `Widget`
constructor provided by the Soundcloud SDK :

```javascript
const myWidget = SC.Widget("an-iframe-id")
```

The API is initialized just once by iframe. However, once initialized, it
can potentially be manipulated from multiple user actions (i.e. playing/pausing
a song, switching to the next song, ...). Such actions, by depending on the use
of the Soundcloud API, imply side effects, and are therefore handled in Epics
(see `/src/epics/soundcloud.js`).

How can each epic be aware of the API, given that :
- we cannot store it in the redux store, or pass it along redux actions, as it
is a complex object and could lead to performance issues,
- we cannot instantiate it as a dependency of every epics, because the
instanciation depends on an iframe id which we are not aware of ?

## Solution

What we need is to define a new dependency of every epics which allow us to
dynamically retrieve the initialized API on purpose.

This is achieved in the `/src/soundcloud/soundcloud-widget-repository.js`
module, and the syntax can look a bit fancy at first sight. Let's break it down
a little. First we define a simple function that takes an `instance` single
parameter and returns an object with two methods to set & get this `instance` :

```javascript
// /src/soundcloud/soundcloud-widget-repository.js
const soundcloudWidget = instance => ({
  setInstance: myInstanceToStore => instance = myInstanceToStore,
  getInstance: () => instance,
})
```

Second, we instantiate this repository with a `null` value and pass it as a
dependency of epics, so they can use it :

```javascript
// ./wrap-with-provider.js
const scRepository = soundcloudWidget(null)

const deps = {
  repo: () => scRepository,
}

// usage example in any epic
const myEpic = (action$, state$, { repo }) => action$.pipe(
  // ...
  tap(() => repo().getInstance().play()),
  // ...
)
```

The final syntax is just a shortcut of the first and the second step : by
writing this function as an IEF, we can directly initialize the repo with a
default `null` value, and pass it as is in the epics dependencies :

```javascript
// /src/soundcloud/soundcloud-widget-repository.js
const soundcloudWidget = instance => ({
  setInstance: myInstanceToStore => instance = myInstanceToStore,
  getInstance: () => instance,
})

const soundCloudWidgetRepository = (
  soundcloudWidget,
)(null)

// which can be shortened to :
const soundCloudWidgetRepository = (
  instance => ({
    setInstance: myInstanceToStore => instance = myInstanceToStore,
    getInstance: () => instance,
  })
)(null)
```

Finally we can directly import this function from our dependecy injection
responsible module to use it :

```javascript
// ./wrap-with-provider.js
import scRepository from "./src/soundcloud/soundcloud-widget-repository.js"

const deps = {
  repo: () => scRepository,
}
```

## Conclusion

Syntax sugar, but good thing to know !
