---
title: Cascade de la Pisserotte
date: "2021-02-15"
coverImage: "blog/cascade-pisse/upperview.jpg"
excerpt: "Cascade et toponymie, une histoire de pisse."
ogImage:
  url: "blog/cascade-pisse/upperview.jpg"
---

Aujourd'hui je suis parti découvrir la [Cascade de la Pisserote](https://www.openstreetmap.org/node/5034692019).
Le température ont été négatives ces derniers jours, le lieu est recouvert de glace.

![Ice cubes at the cascade](/blog/cascade-pisse/icecubes.jpg "Ice cubes at the cascade")

En revenant de la sortie, j'ai repensé a son nom, Pisserotte. Une cascade qui pisse c'est probablement commun.
Je suis donc parti en quête des autres cascades qui portent un nom avec la même racine.

Pour se faire rien de plus pratique d'OpenStreetMap et son [API Overpass](https://wiki.openstreetmap.org/wiki/Overpass_API).

```javascript
node
  [name~"Piss"][waterway="waterfall"];
out;
```

Avec [Overpass Turbo](http://overpass-turbo.eu/s/13G3) on peut voir directement le résultat sur une carte.

![Overpass Query Result](/blog/cascade-pisse/map.png "Overpass Query Result")

54 cascades, chutes & consors. 2 ne sont pas représentés sur cette carte (1 en Ecosse, 1 sur Terre-Neuve).

La toponymie manque parfois d'originalité.
