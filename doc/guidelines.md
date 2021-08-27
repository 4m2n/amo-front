# General guidelines on how to edit the website's data

You can edit some of the website's content without altering React components or
the codebase itself. This little guide is intended to give general informations
on which data is concerned, and which part of the website will be affected.

## General informations

Data files are located here : [/src/markdown/](./src/markdown/). They all
contain markdown data. You can find informations about the markdown syntax
[here](https://www.markdownguide.org/cheat-sheet/).

On top of each file, you will notice two attributes `id` and `title` like in the
following example :

```
---
id: my-id
title: My wonderful title
---
```

Don't edit the `id`, as its value could be used in the codebase. Information on
how modifying the `title` attribute would affect the website is given in the
following sections.

## biography.md

**Data location :** [/src/markdown/biography.md](./src/markdown/biography.md)

**Pages affected :**
- homepage (`amo-musique.fr/`)

**Sections affected :** Biography section on the homepage, between the heading
photography and the latest news / upcoming show section. The title can be
modified by editing the `title` attribute.

Styling (italic, bold, etc) is supported so don't hesitate to use it so the text
will look dynamic :)

The first paragraph will always be displayed, whereas others will be hidden
until a user clicks on the `Lire la bio complète` button below.

**Data structure :** plain text

## tour.md

**Data location :** [/src/markdown/tour.md](./src/markdown/tour.md)

**Pages affected :**
- homepage (`amo-musique.fr/`)
- tour (`amo-musique.fr/concerts`)

**Sections affected :** On the homepage, the next upcoming show will be
displayed right to the latest news player, below the biography section. If the
file does not contain any upcoming show, then this section will not be shown at
all and the latest news player will take the whole width of the page.

On the tour page, every show displayed is the reflection of the shows listed in
the data file.

**Data structure :** table

Each line is a show, each cell is an attribute of the show. Shows have the
following attributes:
- ville   :: String
- lieu    :: String
- date    :: String (date in french format DD/MM/AAAA)
- prix    :: Integer
- acheter :: String (http link to the online ticket, if any)

For each show, the following presentation rules will apply on the booking button
based on the data you provided :
- empty `prix` + empty `acheter` link : "Entrée gratuite" label.
- non-empty `prix` + empty `acheter` link : "Vente sur place (`prix`€)" label.
- non-empty `prix` + non-empty `acheter` link : Button "Réserver (`prix`)" that
redirects the user to the online reservation platform.
- empty `prix` + non-empty `acheter` link : Button "Réserver (Entrée gratuite)"
that redirects the user to the online reservation platform.

## track-freres.md, track-pauline.md, ...

**Data location :**
- [/src/markdown/track-freres.md](./src/markdown/track-freres.md)
- [/src/markdown/track-lhpn.md](./src/markdown/track-lhpn.md)
- [/src/markdown/track-meandres.md](./src/markdown/track-meandres.md)
- [/src/markdown/track-ogres.md](./src/markdown/track-ogres.md)
- [/src/markdown/track-pauline.md](./src/markdown/track-pauline.md)

**Pages affected :**
- music player (`amo-musique.fr/ecouter`)

**Sections affected :** Lyrics right to the player.

**Data structure :** plain text

Be careful on the syntax, each line of a paragraph should begin and end by an
`*` character in order to be correctly displayed in the page.

## Static files (pdf, ...)

You can update static files at any time (for example to replace a PDF file with
a more recent version). Just be careful to keep the name of the file exactly the
same as before, as the system relies on file names to import and display them in
React components.

Static files are located here : [/src/assets/](./src/assets/).
