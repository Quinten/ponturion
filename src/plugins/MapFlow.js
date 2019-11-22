class MapFlow extends Phaser.Plugins.BasePlugin {

    constructor (pluginManager)
    {
        super(pluginManager);
        this.events = new Phaser.Events.EventEmitter();
        this.worker = new Worker('mapflow.js');
        this.worker.onmessage = function(e) {
            this.events.emit('mapsupdated', e.data);
        }.bind(this);
    }

    initMaps() {
        this.worker.postMessage({event: 'init'});
    }

    moveUp() {
        this.worker.postMessage({event: 'moveup'});
    }

    moveRight() {
        this.worker.postMessage({event: 'moveright'});
    }

    moveDown() {
        this.worker.postMessage({event: 'movedown'});
    }

    moveLeft() {
        this.worker.postMessage({event: 'moveleft'});
    }
}

export default MapFlow;
