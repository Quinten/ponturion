class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key, frame, facing) {
        super(scene, x, y, key, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setDepth(1);
    }

    update(controls, time, delta) {

        this.body.setVelocityX(0);
        this.body.setVelocityY(0);

        if (controls.left) {
            this.body.setVelocityX(-64);
        } else if (controls.right) {
            this.body.setVelocityX(64);
        }

        if (controls.up) {
            this.body.setVelocityY(-64);
        } else if (controls.down) {
            this.body.setVelocityY(64);
        }
    }
}

export default Player;
