import { createTestScheduler } from "./../test-utils"
import { of } from "rxjs"
import { TestScheduler } from "rxjs/testing"
import {
  CURRENT_SOUND_RECEIVED,
  ERROR,
  WAIT_FOR_SOUNDCLOUD_EVENT,
  error,
  initialize,
  initialized,
  pause,
  paused,
  play,
  playing,
} from "./../state/soundcloud/widget"
import {
  getCurrentSoundEpic,
  initializeSoundcloudWidgetEpic,
  pauseEpic,
  playEpic,
  waitForSoundcloudToBePausedEpic,
  waitForSoundcloudToBePlayingEpic,
} from "./soundcloud"

let widgetApiCalls = []
let bindCalls = []

beforeEach(() => {
  widgetApiCalls = []
  bindCalls = []
})

const widgetMock = id => {
  widgetApiCalls.push(id)

  return ({
    bind: (event, callback) => {
      bindCalls.push(event)
      callback()
    }
  })
}

describe("epics :: soundcloud :: initializeSoundcloudWidgetEpic", () => {
  it("initializes the soundcloud widget API correctly", () => {
    let setInstanceCalls = []

    const deps = {
      soundcloud: () => ({
        Widget: widgetMock,
      }),
      soundcloudWidget: () => ({
        setInstance: instance => setInstanceCalls.push(instance),
      }),
    }

    // The correct behavior of this epic is verified through four steps :
    const testScheduler = new TestScheduler((actual, expected) => {
      // 1. the correct action is dispatched at the end of the flow
      expect(actual).toEqual(expected)

      // 2. the widget instance has been saved for future usage, using a dependency
      expect(setInstanceCalls).toHaveLength(1)

      // 3. the Widget constructor has been called exactly once, with the correct id
      expect(widgetApiCalls).toHaveLength(1)
      expect(widgetApiCalls[0]).toBe("this-is-a-widget-iframe-id")

      // 4. the "ready" soundcloud domain event has been successfully binded
      expect(bindCalls).toHaveLength(1)
      expect(bindCalls[0]).toBe("ready")
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot("a", {
        a: initialize("this-is-a-widget-iframe-id"),
      })

      expectObservable(
        initializeSoundcloudWidgetEpic(action$, null, deps)
      ).toBe("a", {
        a: initialized(),
      })
    })
  })

  it("dispatches an ERROR action when an error occures", () => {
    const deps = {
      soundcloud: () => ({
        Widget: () => null,
      }),
      soundcloudWidget: () => ({
        setInstance: instance => setInstanceCalls.push(instance),
      }),
    }

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot("a", {
        a: initialize(),
      })

      expectObservable(
        initializeSoundcloudWidgetEpic(action$, null, deps)
      ).toBe("a", {
        a: error("TypeError: Cannot read property 'bind' of null"),
      })
    })
  })
})

describe("epics :: soundcloud :: waitForSoundcloudToBePlayingEpic", () => {
  it("waits for the soundcloud SDK to be playing and dispatch the PLAYING action", () => {
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => widgetMock(),
      }),
    }

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
      expect(bindCalls).toHaveLength(1)
      expect(bindCalls[0]).toBe("play")
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot("a", {
        a: initialized(),
      })

      expectObservable(
        waitForSoundcloudToBePlayingEpic(action$, null, deps)
      ).toBe("a", {
        a: playing(),
      })
    })
  })

  it("dispatches an ERROR action when an error occures", () => {
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => ({
          bound: () => null,
        }),
      }),
    }

    createTestScheduler().run(({ hot, cold, expectObservable }) => {
      const action$ = hot("a", {
        a: initialized(),
      })

      expectObservable(
        waitForSoundcloudToBePlayingEpic(action$, null, deps)
      ).toBe("a", {
        a: error("TypeError: widget.bind is not a function"),
      })
    })
  })
})

describe("epics :: soundcloud :: waitForSoundcloudToBePausedEpic", () => {
  it("waits for the soundcloud SDK to be paused and dispatch the PAUSED action", () => {
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => widgetMock(),
      }),
    }

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
      expect(bindCalls).toHaveLength(1)
      expect(bindCalls[0]).toBe("pause")
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot("a", {
        a: initialized(),
      })

      expectObservable(
        waitForSoundcloudToBePausedEpic(action$, null, deps)
      ).toBe("a", {
        a: paused(),
      })
    })
  })

  it("dispatches an ERROR action when an error occures", () => {
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => ({
          bound: () => null,
        }),
      }),
    }

    createTestScheduler().run(({ hot, cold, expectObservable }) => {
      const action$ = hot("a", {
        a: initialized(),
      })

      expectObservable(
        waitForSoundcloudToBePausedEpic(action$, null, deps)
      ).toBe("a", {
        a: error("TypeError: widget.bind is not a function"),
      })
    })
  })
})

describe("epics :: soundcloud :: getCurrentSoundEpic", () => {
  it("dispatches the CURRENT_SOUND_RECEIVED action", done => {
    const action$ = of(initialized())
    const soundMock = {
      "title": "my title",
      "description": "my desc",
      "artwork_url": "my artwork",
      "permalink_url": "my link",
      "created_at": "my date",
    }
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => ({
          getCurrentSound: callback => callback(soundMock)
        }),
      }),
    }

    getCurrentSoundEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(CURRENT_SOUND_RECEIVED)
        expect(action.sound.title).toBe("my title")
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)

  it("dispatches an ERROR action when an error occures", done => {
    const action$ = of(initialized())
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => ({
          noop: () => null,
        }),
      }),
    }

    getCurrentSoundEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(ERROR)
        expect(action.message).toBe(
          "TypeError: widget.getCurrentSound is not a function"
        )
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)
})

describe("epics :: soundcloud :: playEpic", () => {
  it("dispatches the WAIT_FOR_SOUNDCLOUD_EVENT_ACTION", done => {
    const action$ = of(play())
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => ({
          play: () => null,
        }),
      }),
    }

    playEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(WAIT_FOR_SOUNDCLOUD_EVENT)
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)

  it("dispatches an ERROR action when an error occures", done => {
    const action$ = of(play())
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => ({
          noop: () => null,
        }),
      }),
    }

    playEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(ERROR)
        expect(action.message).toBe(
          "TypeError: widget.play is not a function"
        )
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)
})

describe("epics :: soundcloud :: pauseEpic", () => {
  it("dispatches the WAIT_FOR_SOUNDCLOUD_EVENT_ACTION", done => {
    const action$ = of(pause())
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => ({
          pause: () => null,
        }),
      }),
    }

    pauseEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(WAIT_FOR_SOUNDCLOUD_EVENT)
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)

  it("dispatches an ERROR action when an error occures", done => {
    const action$ = of(pause())
    const deps = {
      soundcloudWidget: () => ({
        getInstance: () => ({
          noop: () => null,
        }),
      }),
    }

    pauseEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(ERROR)
        expect(action.message).toBe(
          "TypeError: widget.pause is not a function"
        )
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)
})
