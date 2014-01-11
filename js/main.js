
enchant();
window.onload = function() {
    possibleEnemies = [
        'img/avatars/ben.jpg', 'img/avatars/dieter.jpg', 'img/avatars/fabian.jpg',
        'img/avatars/geert.jpg', 'img/avatars/gerrie.jpg', 'img/avatars/hansb.jpg',
        'img/avatars/hansb.jpg', 'img/avatars/hanss.jpg', 'img/avatars/jasper.jpg',
        'img/avatars/jb.jpg', 'img/avatars/jo.jpg', 'img/avatars/kevin.jpg',
        'img/avatars/kris.jpg', 'img/avatars/michael.jpg', 'img/avatars/milan.jpg',
        'img/avatars/mrtom.jpg', 'img/avatars/pauline.jpg', 'img/avatars/peterc.jpg',
        'img/avatars/roel.jpg', 'img/avatars/sander.jpg', 'img/avatars/stijn.jpg',
        'img/avatars/wimvc.jpg'
    ];

    game = new Game(320,320);
    game.keybind(32, 'a');  // Spacebar linked to A-event. For shooting
    game.score = 0;

    // Image assets
    game.preload('img/ship-32.png', 'img/icon0.png', 'img/a-32.png', 'img/effect0.png', 'img/game-over.jpg');
    game.preload(possibleEnemies);

    // Sound assets
    game.preload('sounds/laser.wav', 'sounds/shot5.wav', 'sounds/johnson-long-version.mp3');

    // Styling
    game.fps = 60;
//    game.scale = 1;

    game.onload = function() {
        game.enemiesOnScreen = Array();

        // Initialize our ship
        game.ship = new Ship();

        // ScoreLabel
        var scoreLabel = new ScoreLabel(10, 10);
        scoreLabel.on("enterframe", function() {
            if (this.age % 30 == 0) {
                this.score = game.score;
            }
        });
        game.rootScene.addChild(scoreLabel);

        // generate enemy every 120 frames
        game.rootScene.tl.then(function() {
            var enemy = new AEnemy();
            enemy.key = game.enemiesOnScreen.push(enemy) - 1;
        }).delay(120).loop();

        // generate enemy every 30 frames
        game.rootScene.tl.then(function() {
            var enemy = new UEnemy();
            enemy.key = game.enemiesOnScreen.push(enemy) - 1;
        }).delay(15).loop();


        // Setup our keyboard listeners
        game.rootScene.on(enchant.Event.A_BUTTON_DOWN, function(){
            var laser = new Laser();
        });
        // The rest of the keys get picked up in our Ship-Class down below

        // Show our ship
        game.rootScene.addChild(game.ship);
    };

    game.start(); //Begin the game
}


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

        game.rootScene.addChild(this);     // add to canvas
    },
    remove: function () {
        game.rootScene.removeChild(this);
        delete this;
    }

});

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
                    var gameoverimg = new Sprite(160, 115);
                    gameoverimg.image = game.assets['img/game-over.jpg'];
                    gameoverimg.x = 80;
                    gameoverimg.y = 80;
                    game.rootScene.addChild(gameoverimg);


                    game.assets['sounds/johnson-long-version.mp3'].play();
                    game.stop();
//                    alert('game over! Your score: ' + game.score);
                }
            }
        });
    }
});

var AEnemy = enchant.Class.create(enchant.Sprite, {
    initialize: function(){
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['img/a-32.png']; // set image
        this.moveTo(Math.min(284, Math.floor((Math.random() * 288) + 32)), 16);
        this.tl.moveBy(0, 320, 75);        // set movement

        this.addEventListener('enterframe', function () {
            if(this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
                this.remove();
            }
        });

        game.rootScene.addChild(this);     // add to canvas
    },
    remove: function () {
        game.rootScene.removeChild(this);
        delete game.enemiesOnScreen[this.key];
    }
});

var UEnemy = enchant.Class.create(enchant.Sprite, {
    initialize: function(){
        enchant.Sprite.call(this, 28, 28);
        this.image = game.assets[possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)]]; // set image
        this.moveTo(Math.min(284, Math.floor((Math.random() * 288) + 32)), 16);
        this.tl.moveBy(0, 320, 150);        // set movement
        game.rootScene.addChild(this);     // add to canvas
    },
    remove: function () {
        game.rootScene.removeChild(this);
        delete game.enemiesOnScreen[this.key];
    }
});

var Explosion =  enchant.Class.create(enchant.Sprite, {
    initialize: function(x,y) {
        game.assets['sounds/shot5.wav'].play();
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['img/effect0.png'];
        this.frame = 1;
        this.x = x;
        this.y = y;

        game.rootScene.addChild(this);

        // Remove this image in a few moments
        var expl = this;
        setTimeout(function() {
            expl.remove();
        }, 200);

    },
    remove: function () {
        game.rootScene.removeChild(this);
    }
});

