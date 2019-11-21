class MapFlow extends Phaser.Plugins.BasePlugin {

    constructor (pluginManager)
    {
        super(pluginManager);
        this.worker = new Worker('mapflow.js');
        this.worker.onmessage = function(e) {
            console.log('Message received from worker');
            console.log(e.data);
        }
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
