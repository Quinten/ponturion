let isOn = true;
let savedSetting = localStorage.getItem('sfxNUTTYTWINS');
if (savedSetting === 'off') {
    isOn = false;
}

class Sfx extends Phaser.Plugins.BasePlugin {

    play(key, seed = 1)
    {
        if (this.isOn) {
            if (!this.game.cache.audio.exists(key)) {
                return;
            }
            this.game.sound.playAudioSprite(key, key + (Math.floor(Math.random() * seed)), {
                mute: false,
                volume: 1,
                rate: 1,
                //rate: 0.8 + (Math.random() * 0.4),
                detune: 0
            });
        }
    }

    get isOn() {
        return isOn;
    }

    set isOn(value) {
        isOn = value;
        localStorage.setItem('sfxNUTTYTWINS', (value) ? 'on' : 'off');
    }
}

export default Sfx;
