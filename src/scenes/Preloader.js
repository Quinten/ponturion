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
        this.load.tilemapTiledJSON('title', 'assets/title.json');
        this.load.audio('music', 'assets/music.mp3');
        this.load.audioSprite('jump', 'assets/jump.json', 'assets/jump.mp3');
        */
        //this.load.image('tiles', 'assets/tiles.png');
        this.load.image('tiles', 'assets/tiles-extruded.png');
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
