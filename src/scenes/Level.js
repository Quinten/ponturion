//import Player from '../sprites/Player.js';

class Level extends Phaser.Scene {

    constructor (config)
    {
        super((config) ? config : { key: 'level' });
    }

    create()
    {
        this.cameras.main.setRoundPixels(true);

        this.resizeField(this.scale.width, this.scale.height);

        console.log('level');

        //this.ambient.play();

        //this.dust.addOnePixelDust({ count: 12, alpha: .85 , tint: 0x637b89 });

        this.mapCache = {};

        this.mapflow.events.once('mapsupdated', (data) => {

            // create the maps
            console.log(data);
            data.add.forEach(this.addMap.bind(this));

            this.cameras.main.setBackgroundColor(window.bgColor);
//            this.cameras.main.flash(2000, window.fadeColor.red, window.fadeColor.green, window.fadeColor.blue);

            this.controls.start();

            // tmp
            this.controls.events.on('upup', () => {
                this.mapflow.moveUp();
            });
            this.controls.events.on('rightup', () => {
                this.mapflow.moveRight();
            });
            this.controls.events.on('downup', () => {
                this.mapflow.moveDown();
            });
            this.controls.events.on('leftup', () => {
                this.mapflow.moveLeft();
            });

            this.mapflow.events.on('mapsupdated', (data) => {
                data.add.forEach(this.addMap.bind(this));
                data.remove.forEach(this.removeMap.bind(this));
            });
        });
        this.mapflow.initMaps();
    }

    addMap(mapData) {
        let tiledata = mapData.data;
        let map = this.make.tilemap({ data: tiledata, tileWidth: 8, tileHeight: 8});
        let tiles = map.addTilesetImage('tiles', 'tiles', 8, 8, 0, 0);
        let layer = map.createStaticLayer(0, tiles, mapData.x * 32, mapData.y * 32);
        this.mapCache[String(mapData.id)] = map;
    }

    removeMap(mapData) {
        let map = this.mapCache[String(mapData.id)];
        map.destroy();
        delete this.mapCache[String(mapData.id)];
    }

    update(time, delta)
    {
    }

    resizeField(w, h)
    {
    }

    onGamePause()
    {
        //this.gamepaused.visible = true;
    }

    onGameResume()
    {
        //this.gamepaused.visible = false;
    }
}

export default Level;
