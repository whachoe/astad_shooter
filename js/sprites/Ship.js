var Ship = enchant.Class.create(enchant.Sprite, {
    moveSpeed : 5, // How many pixels does our ship move at once?

    initialize: function() {
        enchant.Sprite.call(this, 32, 37);
        this.x = 150;
        this.y = 270;
        this.scaleX = 1;
        this.scaleY = 1;
        this.image = game.assets['img/ship-32.png'];

        this.addEventListener('enterframe', function () {
            // Move the ship
            if (game.input.left && !game.input.right) {
                this.x -= this.moveSpeed;
            }
            else if (game.input.right && !game.input.left) {
                this.x += this.moveSpeed;
            }
            if (game.input.up && !game.input.down) {
                this.y -= this.moveSpeed;
            }
            else if (game.input.down && !game.input.up) {
                this.y += this.moveSpeed;
            }

            // Keep our ship inside the screen
            if (this.x < -this.width/2) {
                this.x = -this.width/2;
            }
            if (this.x > game.width - this.width/2) {
                this.x = game.width - this.width/2;
            }
            if (this.y < -this.height/2) {
                this.y = -this.height/2;
            }
            if (this.y > game.height - this.height/2) {
                this.y = game.height - this.height/2;
            }

            // Check if we're crashing with an enemy
            for (var i in game.enemiesOnScreen) {
                // We got hit!
                if(game.enemiesOnScreen[i].intersect(this)) {
                    new Explosion(this.x, this.y);
                    this.remove();
                    game.enemiesOnScreen[i].remove();

                    // Game over
                    var gameoverscene = new gameoverScene();
                    game.replaceScene(gameoverscene);
                }
            }
        });
    }
});