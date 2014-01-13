var Laser = enchant.Class.create(enchant.Sprite, {
    initialize: function(){
        game.assets['sounds/laser.wav'].play();
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['img/icon0.png'];
        this.moveTo(game.ship.x + 8, game.ship.y - 8); // Initial Position
        this.tl.moveBy(0, -320, 15);        // set movement: Move vertically to top
        this.frame = 56;                   // set image data

        this.addEventListener('enterframe', function () {
            if(this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
                this.remove();
            }

            for (var i in game.enemiesOnScreen) {
                // We got a hit!
                if(game.enemiesOnScreen[i].intersect(this)) {
                    if (game.enemiesOnScreen[i] instanceof UEnemy) {
                        new Explosion(this.x, this.y);
                        game.score += 100;
                        game.enemiesOnScreen[i].remove();
                    } else if (game.enemiesOnScreen[i] instanceof AEnemy) {
                        // This one just eats our bullets: A is Strong!
                    }

                    this.remove();
                }
            }
        });

        game.currentScene.addChild(this);     // add to canvas
    },
    remove: function () {
        game.currentScene.removeChild(this);
        delete this;
    }

});