enchant();
window.onload = function() {
    var movePx = 10;

    game = new Game(320,320);
    game.keybind(32, 'a');  // Spacebar linked to A-event. For shooting

    // Image assets
    game.preload('ship-32.png', 'icon0.png');

    // Sound assets
    game.preload('laser.wav');

    // Styling
    game.rootScene.backgroundColor = 'black';
    game.fps = 20;

    game.onload = function() {
        var ship = new Sprite(32, 37);
        ship.x = 150;
        ship.y = 270;
        ship.scaleX = 1;
        ship.scaleY = 1;
        ship.image = game.assets['ship-32.png'];

        var Laser = enchant.Class.create(enchant.Sprite, {
            initialize: function(){
                enchant.Sprite.call(this, 16, 16);
                this.image = game.assets['icon0.png']; // set image
                this.moveTo(ship.x + 8, ship.y - 8);       // move to the position
                this.tl.moveBy(0, -320, 5);        // set movement
                this.frame = 56;                   // set image data
                game.rootScene.addChild(this);     // add to canvas
            }
        });

        game.rootScene.on(enchant.Event.DOWN_BUTTON_DOWN, function() {
            ship.y += movePx;
        });
        game.rootScene.on(enchant.Event.UP_BUTTON_DOWN, function() {
            ship.y -= movePx;
        });
        game.rootScene.on(enchant.Event.LEFT_BUTTON_DOWN, function() {
            ship.x -= movePx;
        });
        game.rootScene.on(enchant.Event.RIGHT_BUTTON_DOWN, function() {
            ship.x += movePx;
        });
        game.rootScene.on(enchant.Event.A_BUTTON_DOWN, function(){
            console.log('SHOOT!');
            game.assets['laser.wav'].play();
            var laser = new Laser();

        });

        game.rootScene.addChild(ship);
    };

    game.start(); //Begin the game
}