class Preloader extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloader' });
    }

    preload ()
    {
        this.sys.canvas.style.display = 'block';

        // just a preload bar in graphics
        let progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.lineStyle(2, 0xffffff, 1);
            progress.strokeRect((this.scale.width / 2) - 132, (this.scale.height / 2) - 20, 264, 40);
            progress.fillStyle(0xffffff, 1);
            progress.fillRect((this.scale.width / 2) - 128, (this.scale.height / 2) - 16, 256 * value, 32);
        });
        this.load.on('complete', () => {
            progress.destroy();
        });

        // Load assets here
        // ...
        /*
        this.load.image('tiles', 'assets/tiles.png');
        this.load.image('tiles-extruded', 'assets/tiles-extruded.png');
        this.load.image('maroon-extruded', 'assets/tiles/maroon-extruded.png');
        this.load.image('greentea-extruded', 'assets/tiles/greentea-extruded.png');
        this.load.image('grey-extruded', 'assets/tiles/grey-extruded.png');
        this.load.image('velvet-extruded', 'assets/tiles/velvet-extruded.png');
        this.load.image('lagoon-extruded', 'assets/tiles/lagoon-extruded.png');
        this.load.image('brownangles-extruded', 'assets/tiles/brownangles-extruded.png');
        this.load.image('mint-extruded', 'assets/tiles/mint-extruded.png');
        this.load.image('stormcloud-extruded', 'assets/tiles/stormcloud-extruded.png');
        this.load.image('maroonalt-extruded', 'assets/tiles/maroonalt-extruded.png');
        this.load.image('bluebrick-extruded', 'assets/tiles/bluebrick-extruded.png');
        this.load.image('stormalt-extruded', 'assets/tiles/stormalt-extruded.png');
        this.load.image('greyalt-extruded', 'assets/tiles/greyalt-extruded.png');
        this.load.image('velvetalt-extruded', 'assets/tiles/velvetalt-extruded.png');
        this.load.image('stormtree-extruded', 'assets/tiles/stormtree-extruded.png');
        this.load.image('brownstuff-extruded', 'assets/tiles/brownstuff-extruded.png');
        this.load.image('alttiles-extruded', 'assets/tiles/alttiles-extruded.png');
        this.load.image('endground', 'assets/endground.png');
        this.load.tilemapTiledJSON('title', 'assets/title.json');
        this.load.tilemapTiledJSON('runjumpintro', 'assets/runjumpintro.json');
        this.load.tilemapTiledJSON('pushintro', 'assets/pushintro.json');
        this.load.tilemapTiledJSON('respawnintro', 'assets/respawnintro.json');
        this.load.tilemapTiledJSON('dvh', 'assets/dvh.json');
        this.load.tilemapTiledJSON('goingdown', 'assets/goingdown.json');
        this.load.tilemapTiledJSON('laserintro', 'assets/laserintro.json');
        this.load.tilemapTiledJSON('solidlasers', 'assets/solidlasers.json');
        this.load.tilemapTiledJSON('buttonintro', 'assets/buttonintro.json');
        this.load.tilemapTiledJSON('ldfinal', 'assets/ldfinal.json');
        //this.load.tilemapTiledJSON('elevatortest', 'assets/elevatortest.json');
        //this.load.tilemapTiledJSON('elevatordebug', 'assets/elevatordebug.json');
        //this.load.tilemapTiledJSON('elevatordebugsquash', 'assets/elevatordebugsquash.json');
        //this.load.tilemapTiledJSON('elevatorturntest', 'assets/elevatorturntest.json');
        //this.load.tilemapTiledJSON('switchtest', 'assets/switchtest.json');
        this.load.tilemapTiledJSON('elevatorintro', 'assets/elevatorintro.json');
        this.load.tilemapTiledJSON('elevatorturn', 'assets/elevatorturn.json');
        this.load.tilemapTiledJSON('crossyelevators', 'assets/crossyelevators.json');
        this.load.tilemapTiledJSON('separaterooms', 'assets/separaterooms.json');
        this.load.tilemapTiledJSON('switchintro', 'assets/switchintro.json');
        this.load.tilemapTiledJSON('telepuddles', 'assets/telepuddles.json');
        this.load.tilemapTiledJSON('switchstairs', 'assets/switchstairs.json');
        this.load.tilemapTiledJSON('doublepink', 'assets/doublepink.json');
        this.load.tilemapTiledJSON('bluelagoon', 'assets/bluelagoon.json');
        //this.load.tilemapTiledJSON('horizontalcamsplit', 'assets/horizontalcamsplit.json');
        //this.load.tilemapTiledJSON('verticalcamsplit', 'assets/verticalcamsplit.json');
        this.load.audio('music', 'assets/music.mp3');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('enemy', 'assets/enemy.png', { frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('particles', 'assets/particles.png', { frameWidth: 4, frameHeight: 4 });
        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 13, frameHeight: 11 });
        this.load.spritesheet('elevator', 'assets/elevator.png', { frameWidth: 24, frameHeight: 8 });
        this.load.spritesheet('levelselectsprite', 'assets/levelselectsprite.png', { frameWidth: 32, frameHeight: 24 });
        this.load.image('menubg', 'assets/menubg.png');
        this.load.image('levelselectbg', 'assets/levelselectbg.png');
        this.load.image('helpbg', 'assets/helpbg.png');
        this.load.audioSprite('jump', 'assets/jump.json', 'assets/jump.mp3');
        this.load.audioSprite('run', 'assets/run.json', 'assets/run.mp3');
        this.load.audioSprite('coin', 'assets/coin.json', 'assets/coin.mp3');
        this.load.audioSprite('spawn', 'assets/spawn.json', 'assets/spawn.mp3');
        this.load.audioSprite('success', 'assets/success.json', 'assets/success.mp3');
        this.load.audioSprite('uimove', 'assets/uimove.json', 'assets/uimove.mp3');
        this.load.audioSprite('click', 'assets/click.json', 'assets/click.mp3');
        this.load.audioSprite('laserstop', 'assets/laserstop.json', 'assets/laserstop.mp3');
        this.load.audioSprite('elevatorstart', 'assets/elevatorstart.json', 'assets/elevatorstart.mp3');
        this.load.audioSprite('teleport', 'assets/teleport.json', 'assets/teleport.mp3');
        */
        this.load.image('tiles', 'assets/tiles.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('gamepaused', 'assets/gamepaused.png');
        this.load.image('napie-eight-font', 'assets/napie-eight-font.png');
    }

    create ()
    {
        let fontConfig = {
            image: 'napie-eight-font',
            width: 8,
            height: 8,
            chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ .,!?#abcdefghijklmnopqrstuvwxyz@:;^%&1234567890*\'"`[]/\\~+-=<>(){}_|$',
            charsPerRow: 16,
            spacing: { x: 0, y: 0 }
        };

        this.cache.bitmapFont.add('napie-eight-font', Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
        /*
        this.load.on('complete', () => {
            this.load.off('complete');
            this.ambient.allMusicLoaded = true;
        }, this);
        this.load.audio('nutty-dance', 'assets/nutty-dance.mp3');
        this.load.audio('nutty-garden', 'assets/nutty-garden.mp3');
        this.load.start();
        */

        this.scene.start('level');
        //this.scene.start('startscreen');
        //this.scene.start('endscreen');
    }

}

export default Preloader;
