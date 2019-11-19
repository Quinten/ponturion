let isOn = true;
let savedSetting = localStorage.getItem('musicNUTTYTWINS');
if (savedSetting === 'off') {
    isOn = false;
}
let currentKey = -1;

const keys = ['music', 'nutty-dance', 'nutty-garden'];

class Ambient extends Phaser.Plugins.BasePlugin
{
    constructor (pluginManager)
    {
        super(pluginManager);
        this.sounds = {};
        this.allMusicLoaded = false;
        this.isPlaying = false;
    }

    play()
    {
        if (this.isPlaying) {
            return;
        }
        currentKey++;
        if (!this.allMusicLoaded || (currentKey >= keys.length)) {
            currentKey = 0;
        }
        let key = keys[currentKey];
        this.loop(key);
    }

    resume()
    {
        if (currentKey < 0 || currentKey >= keys.length) {
            currentKey = 0;
        }
        let key = keys[currentKey];
        this.loop(key);
    }

    loop(key)
    {
        if (!this.sounds[key] && this.isOn) {
            //console.log('loopedieloop');
            //console.log(key);
            if (!this.game.cache.audio.exists(key)) {
                return;
            }
            this.sounds[key] = this.game.sound.add(key);
            if (!this.sounds[key]) {
                return;
            }
            let looped = 0;
            this.sounds[key].on('looped', () => {
                looped++;
                if (looped >= 2) {
                    this.stop('opusmagnus');
                }
            });
            this.sounds[key].play({loop: true});
            this.isPlaying = true;
        }
    }

    stop(skip)
    {
        for (let oldKey in this.sounds) {
            if (oldKey !== skip && this.sounds[oldKey]) {
                this.sounds[oldKey].off('looped');
                this.sounds[oldKey].stop();
                this.sounds[oldKey] = undefined;
            }
        }
        this.isPlaying = false;
    }

    get isOn() {
        return isOn;
    }

    set isOn(value) {
        isOn = value;
        localStorage.setItem('musicNUTTYTWINS', (value) ? 'on' : 'off');
        if (value) {
            this.resume();
        } else {
            this.stop('opusmagnus');
        }
    }
}

export default Ambient;
