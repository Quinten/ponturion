# ponturion

> The Way is shaped by use, But then the shape is lost.
> - Tao Te Ching

This is a procedural generation demo for generating an infinite (platformer) map with javascript.

It is uses web workers to generate the maps in a seperate thread.

The important files to study are:

```
pub/mapflow.js // the web worker

src/plugins/MapFlow.js // a phaser plugin to connect the web worker

src/scenes/Level.js // the phaser scene
```

Play the demo: https://quinten.github.io/ponturion/
