var Laser = enchant.Class.create(enchant.Sprite, {
    initialize: function(){

        // Each hit takes 10 off our score: Accuracy gets promoted
        if (game.score > 0) game.score = Math.max(0, game.score - 10);

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

            for (var i in game.enemiesOnScreen.childNodes) {
                var enemy = game.enemiesOnScreen.childNodes[i];
                // We got a hit!
                if(enemy.intersect(this)) {
                    if (enemy instanceof UEnemy) {
                        new Explosion(this.x, this.y);
                        game.score += 100;
                        game.amountOfEnemies -= 10; // Every time we shoot an enemy, we're going to make the next one come a teeny bit faster
                        game.enemiesOnScreen.removeChild(enemy);
                    } else if (enemy instanceof AEnemy) {
                        // This one just eats our bullets: A is Strong!
                        enemy.hitcount++;
                        if (enemy.hitcount == 3) {
                            new Explosion(this.x, this.y);
                            game.assets['sounds/se4.wav'].play();
                            game.score += 1000;
                            if (game.amountOfEnemies > 15)
                                game.amountOfEnemies -= 15; // Every time we shoot an enemy, we're going to make the next one come a teeny bit faster
                            game.enemiesOnScreen.removeChild(enemy);
                        }
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