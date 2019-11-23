import Player from '../sprites/Player.js';

const mapSize = 480;

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

            this.player = new Player(this, 1.5 * mapSize, 1.5 * mapSize, 'player', 0, 'right');
            this.cameras.main.startFollow(this.player, true);

            this.zone = {x: 1, y: 1};

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
        let tiles = map.addTilesetImage('tiles', 'tiles', 8, 8, 1, 2);
        let layer = map.createStaticLayer(0, tiles, mapData.x * mapSize, mapData.y * mapSize);
        this.mapCache[String(mapData.id)] = map;
    }

    removeMap(mapData) {
        let map = this.mapCache[String(mapData.id)];
        map.destroy();
        delete this.mapCache[String(mapData.id)];
    }

    update(time, delta)
    {
        if (this.player) {
            this.player.update(this.controls);
            let zone = { x: Math.floor(this.player.x / mapSize), y: Math.floor(this.player.y / mapSize) };
            let dirX = this.zone.x - zone.x;
            let dirY = this.zone.y - zone.y;
            if (dirY > 0) {
                this.mapflow.moveUp();
            }
            if (dirX < 0) {
                this.mapflow.moveRight();
            }
            if (dirY < 0) {
                this.mapflow.moveDown();
            }
            if (dirX > 0) {
                this.mapflow.moveLeft();
            }
            this.zone = zone;
        }
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
