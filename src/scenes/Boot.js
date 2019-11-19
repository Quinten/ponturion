class Boot extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'boot' });
        this.resizeTOID = 0;
    }

    create ()
    {
        // more setup stuff here
        // ...

        // This will make your game responsive.
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.onWindowResize();

        this.sys.game.events.on('pause', () => {
            this.scene.manager.scenes.forEach(function (scene) {
                if (scene.scene.settings.visible) {
                    if (scene.onGamePause) {
                        scene.onGamePause();
                        scene.scene.pause();
                    }
                }
            });
        }, this);

        this.sys.game.events.on('blur', () => {
            this.scene.manager.scenes.forEach(function (scene) {
                if (scene.scene.settings.visible) {
                    if (scene.onGamePause) {
                        scene.onGamePause();
                        scene.scene.pause();
                    }
                }
            });
        }, this);

        this.sys.game.events.on('focus', () => {
            this.scene.manager.scenes.forEach(function (scene) {
                if (scene.scene.settings.visible) {
                    scene.scene.resume();
                    if (scene.onGameResume) {
                        scene.onGameResume();
                    }
                }
            });
        }, this);

        this.sys.game.events.on('resume', () => {
            this.scene.manager.scenes.forEach(function (scene) {
                if (scene.scene.settings.visible) {
                    scene.scene.resume();
                    if (scene.onGameResume) {
                        scene.onGameResume();
                    }
                }
            });
        }, this);

        this.scene.start('preloader');

        // hide and show mouse
        let mouseHideTO = 0;
        this.sys.canvas.style.cursor = 'none';
        this.sys.canvas.addEventListener('mousemove', () => {
            this.sys.canvas.style.cursor = 'default';
            clearTimeout(mouseHideTO);
            mouseHideTO = setTimeout(() => {
                this.sys.canvas.style.cursor = 'none';
            }, 1000);
        });
    }

    onWindowResize()
    {
        clearTimeout(this.resizeTOID);
        this.resizeTOID = setTimeout(() => {
            // Resize game configs.
            let longestSide = Math.max(window.innerWidth, window.innerHeight);
            let zoom = 2 * Math.max(1, Math.floor(longestSide / window.maxSize));
            let w = Math.ceil(window.innerWidth / zoom);
            let h = Math.ceil(window.innerHeight / zoom);
            if (w % 1) {
                w += 1;
            }
            if (h % 1) {
                h += 1;
            }
            this.scale.setZoom(zoom);
            this.scale.resize(w, h);
            //this.sys.canvas.style.width = (w * zoom) + 'px';
            //this.sys.canvas.style.height = (h * zoom) + 'px';
            // Check which scene is active.
            this.scene.manager.scenes.forEach(function (scene) {
                if (scene.cameras && scene.cameras.main) {
                    // Scale the camera
                    scene.cameras.main.setViewport(0, 0, w, h);
                }
                if (scene.scene.settings.visible) {
                    if (scene.resizeField) {
                        // Scale/position stuff in the scene itself with this method, that the scene must implement.
                        scene.resizeField(w, h);
                    }
                }
            });
        }, 500);
    }
}

export default Boot;
