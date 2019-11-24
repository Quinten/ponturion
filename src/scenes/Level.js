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
        //this.physics.world.setBounds(0, 0, this.prefabMapWidth, this.prefabMapHeight);

        console.log('level');

        //this.ambient.play();

        //this.dust.addOnePixelDust({ count: 12, alpha: .85 , tint: 0x637b89 });

        this.mapCache = {};
        this.layerCache = {};

        this.mapflow.events.once('mapsupdated', (data) => {

            this.controls.start();

            this.player = new Player(this, 1.5 * mapSize, 1.5 * mapSize, 'player', 0, 'right');
            this.cameras.main.startFollow(this.player, true);

            this.zone = {x: 1, y: 1};

            // create the maps
            data.add.forEach(this.addMap.bind(this));

            this.cameras.main.setBackgroundColor(window.bgColor);
//            this.cameras.main.flash(2000, window.fadeColor.red, window.fadeColor.green, window.fadeColor.blue);

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
        // only up collisions
        /*
        map.setCollision([39, 47, 45]);
        map.forEachTile((tile) => {
            if ([39, 47, 45].indexOf(tile.index) < 0) {
                return;
            }
            tile.collideUp = true;
            tile.collideDown = false;
            tile.collideLeft = false;
            tile.collideRight = false;
        }, this, 0, 0, map.width, map.height);
        // all round collisions
        map.setCollision([33, 43, 38, 53, 54, 55, 56, 61, 62, 63, 64]);
        */
        map.setCollisionBetween(32, 63);
        // collide with player
        this.layerCache[String(mapData.id)] = this.physics.add.collider(this.player, layer);
        this.mapCache[String(mapData.id)] = map;
        //this.layerCache[String(mapData.id)] = layer;
    }

    removeMap(mapData) {
        let layer = this.layerCache[String(mapData.id)];
        layer.destroy();
        delete this.layerCache[String(mapData.id)];
        let map = this.mapCache[String(mapData.id)];
        map.destroy();
        delete this.mapCache[String(mapData.id)];
    }

    update(time, delta)
    {
        if (this.player) {
            this.player.update(this.controls, time, delta);
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
