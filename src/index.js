import 'phaser';
//import DustPhaserPlugin from 'dust-phaser-plugin';
import AnimatedTiles from './plugins/AnimatedTiles.js';
import SimplePlatformerControls from './plugins/SimplePlatformerControls.js';
import Sfx from './plugins/Sfx.js';
import Ambient from './plugins/Ambient.js';
//import LevelStats from './plugins/LevelStats.js';
import MapFlow from './plugins/MapFlow.js';
import Boot from './scenes/Boot.js';
import Preloader from './scenes/Preloader.js';
import Level from './scenes/Level.js';

var prePreLoader = document.getElementById('loading');
if (prePreLoader && prePreLoader.parentNode) {
    prePreLoader.parentNode.removeChild(prePreLoader);
}

window.fadeColor = Phaser.Display.Color.HexStringToColor('#000000');
//window.bgColor = Phaser.Display.Color.HSLToColor(Math.random(), Math.random(), Math.random());
window.bgColor = Phaser.Display.Color.HSLToColor(0, 0, 0);

window.maxSize = 960;

let longestSide = Math.max(window.innerWidth, window.innerHeight);
let zoom = 2 * Math.max(1, Math.floor(longestSide / window.maxSize));

var config = {
    type: Phaser.WEBGL,
    audio: {
        disableWebAudio: !(window.AudioContext || window.webkitAudioContext)
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.NONE,
        width: Math.ceil(window.innerWidth / zoom),
        height: Math.ceil(window.innerHeight / zoom),
        zoom: zoom
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    plugins: {
        scene: [
            { key: 'animatedTiles', plugin: AnimatedTiles, mapping: 'animatedTiles' },
            { key: 'simplePlatformerControls', plugin: SimplePlatformerControls, mapping: 'controls' },
            //{ key: 'DustPlugin', plugin: DustPhaserPlugin, mapping: 'dust' }
        ],
        global: [
            { key: 'sfx', plugin: Sfx, mapping: 'sfx', start: true },
            { key: 'ambient', plugin: Ambient, mapping: 'ambient', start: true },
            //{ key: 'levelstats', plugin: LevelStats, mapping: 'levelstats', start: true }
            { key: 'mapflow', plugin: MapFlow, mapping: 'mapflow', start: true }
        ]
    },
    input: {
        gamepad: true,
        queue: true
    },
    scene: [
        Boot,
        Preloader,
        Level
    ]
};

// start game
window.game = new Phaser.Game(config);
