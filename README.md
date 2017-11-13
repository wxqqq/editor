# Maputnik

[![Build Status](https://travis-ci.org/maputnik/editor.svg?branch=master)][travis]
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/anelbgv6jdb3qnh9/branch/master?svg=true)][appveyor]
[![Dependency Status](https://david-dm.org/maputnik/editor.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/maputnik/editor/dev-status.svg)][dm-dev]
[![License](https://img.shields.io/badge/license-MIT-blue.svg)][license]

[travis]:      https://travis-ci.org/maputnik/editor
[appveyor]:    https://ci.appveyor.com/project/lukasmartinelli/editor
[dm-prod]:     https://david-dm.org/maputnik/editor
[dm-dev]:      https://david-dm.org/maputnik/editor#info=devDependencies
[license]:     https://tldrlegal.com/license/mit-license

<img width="200" align="right" alt="Maputnik" src="src/img/maputnik.png" />

A free and open visual editor for the [Mapbox GL styles](https://www.mapbox.com/mapbox-gl-style-spec/)
targeted at developers and map designers.

- :link: Design your maps online at **<https://maputnik.github.io/editor/>** (all in local storage)
- :link: Use the [Maputnik CLI](https://github.com/maputnik/editor/wiki/Maputnik-CLI) for local style development

Mapbox has built one of the best and most amazing OSS ecosystems. A key component to ensure its longevity and independance is an OSS map designer.

## Documentation

The documentation can be found in the [Wiki](https://github.com/maputnik/editor/wiki). You are welcome to collaborate!

- :link: **Study the [Maputnik Wiki](https://github.com/maputnik/editor/wiki)**
- :video_camera: Design a map from Scratch https://youtu.be/XoDh0gEnBQo

[![Design Map from Scratch](https://j.gifs.com/g5XMgl.gif)](https://youtu.be/XoDh0gEnBQo)

## Develop

Maputnik is written in ES6 and is using [React](https://github.com/facebook/react) and [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/).

We ensure building and developing Maputnik works with

- Linux, OSX and Windows
- Node >4

Install the deps, start the dev server and open the web browser on `http://localhost:8888/`.

```bash
# install dependencies
npm install
# start dev server
npm start
```

The build process will watch for changes to the filesystem, rebuild and autoreload the editor. However note this from the webpack-dev-server docs

> webpack uses the file system to get notified of file changes. In some cases this does not work. For example, when using Network File System (NFS). Vagrant also has a lot of problems with this. 
Snippet from <https://webpack.js.org/configuration/dev-server/#devserver-watchoptions->

To enable polling add `export WEBPACK_DEV_SERVER_POLLING=1` to your enviroment.

```
npm run build
```

Lint the JavaScript code.

```
# run linter
npm run lint
npm run lint-styles
```

## Related Projects

- [maputnik-dev-server](https://github.com/nycplanning/labs-maputnik-dev-server) - An express.js server that allows for quickly loading the style from any mapboxGL map into mapuntnik. 

## Sponsors

Thanks to the supporters of the **[Kickstarter campaign](https://www.kickstarter.com/projects/174808720/maputnik-visual-map-editor-for-mapbox-gl)**. This project would not be possible without these commercial and individual sponsors.

### Gold

- [Wemap](https://getwemap.com/)
- [Orbicon Informatik](https://www.orbiconinformatik.dk/)
- [Terranodo](http://terranodo.io/)

<a href="https://getwemap.com/">
  <img width="33%" alt="Wemap" style="display:inline" src="media/sponsors/wemap.jpg" />
</a>
<a href="http://terranodo.io/">
  <img width="33%" alt="Terranodo" style="display:inline" src="media/sponsors/terranodo.png" />
</a>
<a href="https://www.orbiconinformatik.dk/">
  <img width="32%" alt="Terranodo" style="display:inline" src="media/sponsors/orbicon_informatik.png" />
</a>

<br/>

### Silver

- [Klokan Technologies](https://www.klokantech.com/)
- [Geofabrik](http://www.geofabrik.de/)
- [Dreipol](https://www.dreipol.ch/)

<a href="https://www.klokantech.com/">
  <img width="18%" alt="Klokan Technologies" style="display:inline-block" src="media/sponsors/klokantech.png" />
</a>
<a href="http://www.geofabrik.de/">
  <img width="18%" alt="Geofabrik" style="display:inline-block" src="media/sponsors/geofabrik.png" />
</a>
<a href="https://www.dreipol.ch/">
  <img width="18%" alt="Dreipol" style="display:inline-block" src="media/sponsors/dreipol.png" />
</a>

<br/>

### Individuals

**Influential Stakeholder**

Alan McConchie, Odi, Mats Norén, Uli [geOps](http://geops.ch/), Helge Fahrnberger ([Toursprung](http://www.toursprung.com/)), Kirusanth Poopalasingam

**Stakeholder**

Brian Flood, Vasile Coțovanu, Andreas Kalkbrenner, Christian Mäder, Gregor Wassmann, Lee Armstrong, Rafel, Jon Burgess, Lukas Lehmann, Joachim Ungar, Alois Ackermann, Zsolt Ero, Jordan Meek

**Supporter**

Sina Martinelli, Nicholas Doiron, Neil Cawse, Urs42, Benedikt Groß, Manuel Roth, Janko Mihelić, Moritz Stefaner, Sebastian Ahoi, Juerg Uhlmann, Tom Wider, Nadia Panchaud, Oliver Snowden, Stephan Heuel, Tobin Bradley, Adrian Herzog, Antti Lehto, Pascal Mages, Marc Gehling, Imre Samu, Lauri K., Visahavel Parthasarathy, Christophe Waterlot-Buisine, Max Galka, ubahnverleih, Wouter van Dam, Jakob Lobensteiner, Samuel Kurath, Brian Bancroft

## License

Maputnik is [licensed under MIT](LICENSE) and is Copyright (c) Lukas Martinelli and contributors.

**Disclaimer** This project is not affiliated with Mapbox or Mapbox Studio. It is a independent style editor for the
open source technology in the Mapbox GL ecosystem.
As contributor please take extra care of not violating any Mapbox trademarks. Do not get inspired by Mapbox Studio and make your own decisions for a good style editor.
