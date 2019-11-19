class SimplePlatformerControls extends Phaser.Plugins.ScenePlugin {

    constructor (scene, pluginManager) {
        super(scene, pluginManager);
        this.cursors = undefined;
        this.xbox = Phaser.Input.Gamepad.Configs.XBOX_360;
        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;
        this.aDown = false;
        this.bDown = false;
        this.xDown = false;
        this.yDown = false;
        this.events = new Phaser.Events.EventEmitter();
        this.input = undefined;
        this.lastMobDir = 'idle-right';
        //this.prefInputMethod = scene.sys.game.device.input.touch ? 'touch' : 'keyboard';
        this.prefInputMethod = 'keyboard';
    }

    start() {

        if (!this.input) {
            this.input = this.scene.input;
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.gamepad.on('down', (pad, button, index) => {
            switch (button.index) {
                case 0:
                    this.aDown = true;
                    break;
                case 1:
                    this.bDown = true;
                    break;
                case 2:
                    this.xDown = true;
                    break;
                case 3:
                    this.yDown = true;
                    break;
            }
            this.prefInputMethod = 'gamepad';
        }, this);

        this.input.keyboard.on('keydown', (e) => {
            switch (e.keyCode) {
                case 81:
                case 65:
                case 32:
                    this.aDown = true;
                    break;
                case 67:
                case 66:
                    this.bDown = true;
                    break;
                case 88:
                    this.xDown = true;
                    break;
                case 89:
                case 73:
                    this.yDown = true;
                    break;
            }
            this.prefInputMethod = 'keyboard';
        });

        this.input.gamepad.on('up', (pad, button, index) => {
            switch (button.index) {
                case 0:
                    this.aDown = false;
                    this.events.emit('aup');
                    break;
                case 1:
                    this.bDown = false;
                    this.events.emit('bup');
                    break;
                case 2:
                    this.xDown = false;
                    this.events.emit('xup');
                    break;
                case 3:
                    this.yDown = false;
                    this.events.emit('yup');
                    break;
                case 12:
                    this.events.emit('upup');
                    break;
                case 13:
                    this.events.emit('downup');
                    break;
                case 14:
                    this.events.emit('leftup');
                    break;
                case 15:
                    this.events.emit('rightup');
                    break;
                case 8:
                case 9:
                    this.events.emit('escup');
                    break;
            }
        }, this);

        this.input.keyboard.on('keyup', (e) => {
            switch (e.keyCode) {
                case 81:
                case 65:
                case 32:
                case 13:
                    this.aDown = false;
                    this.events.emit('aup');
                    break;
                case 67:
                case 66:
                    this.bDown = false;
                    this.events.emit('bup');
                    break;
                case 88:
                    this.xDown = false;
                    this.events.emit('xup');
                    break;
                case 89:
                case 73:
                    this.yDown = false;
                    this.events.emit('yup');
                    break;
                case 38:
                    this.events.emit('upup');
                    break;
                case 40:
                    this.events.emit('downup');
                    break;
                case 37:
                    this.events.emit('leftup');
                    break;
                case 39:
                    this.events.emit('rightup');
                    break;
                case 27:
                    this.events.emit('escup');
                    break;
            }
        });

        this.scene.events.on('preupdate', this.preUpdate, this);
        this.scene.events.on('shutdown', this.shutdown, this);

    }

    preUpdate()
    {
        let input = this.input;
        if (input.gamepad && input.gamepad.gamepads && input.gamepad.gamepads[0]) {
            this.up = this.cursors.up.isDown || input.gamepad.gamepads[0].buttons[this.xbox.UP].pressed;
            this.right = this.cursors.right.isDown || input.gamepad.gamepads[0].buttons[this.xbox.RIGHT].pressed;
            this.down = this.cursors.down.isDown || input.gamepad.gamepads[0].buttons[this.xbox.DOWN].pressed;
            this.left = this.cursors.left.isDown || input.gamepad.gamepads[0].buttons[this.xbox.LEFT].pressed;
        } else {
            this.up = this.cursors.up.isDown;
            this.right = this.cursors.right.isDown;
            this.down = this.cursors.down.isDown;
            this.left = this.cursors.left.isDown;
        }

        if (this.prefInputMethod == 'touch') {

            if (this.input.activePointer.justUp) {
                switch (this.lastMobDir) {
                    case 'idle-right':
                        this.lastMobDir = 'run-right';
                        break;
                    case 'idle-left':
                        this.lastMobDir = 'run-left';
                        break;
                    case 'run-right':
                        this.lastMobDir = 'run-left';
                        break;
                    case 'run-left':
                        this.lastMobDir = 'run-right';
                        break;
                }
            }

            switch (this.lastMobDir) {
                case 'idle-right':
                case 'idle-left':
                    this.left = false;
                    this.right = false;
                    break;
                case 'run-right':
                    this.right = true;
                    this.left = false;
                    break;
                case 'run-left':
                    this.right = false;
                    this.left = true;
                    break;
            }

            if (this.input.activePointer.isDown) {
                this.aDown = true;
                this.up = true;
                this.down = false;
            } else {
                this.aDown = false;
                this.up = false;
                this.down = true;
            }
        }
    }

    shutdown()
    {
        this.input.gamepad.off('down');
        this.input.gamepad.off('up');
        this.input.keyboard.off('keydown');
        this.input.keyboard.off('keyup');
        this.input = undefined;
        this.events.off('aup');
        this.events.off('bup');
        this.events.off('xup');
        this.events.off('yup');
        this.events.off('upup');
        this.events.off('downup');
        this.events.off('leftup');
        this.events.off('rightup');
        this.events.off('escup');
        this.scene.events.off('preupdate', this.preUpdate);
        this.scene.events.off('shutdown', this.shutdown);
    }
}

export default SimplePlatformerControls;
