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

        this.cameras.main.setBackgroundColor(window.bgColor);

        this.cameras.main.flash(2000, window.fadeColor.red, window.fadeColor.green, window.fadeColor.blue);
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
