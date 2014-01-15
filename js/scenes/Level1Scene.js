var Level1Scene = enchant.Class.create(enchant.Scene, {
    // The main gameplay scene.
    initialize: function() {
        // 1 - Call superclass constructor
        Scene.apply(this);

        game.enemiesOnScreen = new enchant.Group();
        game.score = 0;
        game.amountOfEnemies = 8000; // with time, decrease this amount slowly so more enemies will appear

        // DGame pad
        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        game.rootScene.addChild(pad);

        // ScoreLabel
        var scoreLabel = new ScoreLabel(10, 10);
        scoreLabel.on("enterframe", function() {
            if (this.age % 30 == 0) {
                this.score = game.score;
            }
        });
        this.addChild(scoreLabel);

        this.addEventListener('enterframe', function() {
            var enemy;

            if (Math.random()*game.amountOfEnemies < 10) {
                enemy = new AEnemy();
                game.enemiesOnScreen.addChild(enemy);
            }

            if (Math.random()*game.amountOfEnemies < 50) {
                enemy = new UEnemy();
                game.enemiesOnScreen.addChild(enemy);
            }

            // If there's nothing happening on the screen: Spawn an enemy
            if (game.enemiesOnScreen.childNodes.length == 0) {
                enemy = new UEnemy();
                game.enemiesOnScreen.addChild(enemy);
            }
        });

        /*
        // generate enemy every 120 frames
        this.tl.then(function() {
            var enemy = new AEnemy();
            game.enemiesOnScreen.addChild(enemy);
        }).delay(120).loop();

        // generate enemy every 30 frames
        this.tl.then(function() {
            var enemy = new UEnemy();
            game.enemiesOnScreen.addChild(enemy);
        }).delay(15).loop();
*/
        this.addChild(game.enemiesOnScreen);

        // Setup our keyboard listeners
        this.on(enchant.Event.A_BUTTON_DOWN, function(){
            var laser = new Laser();
        });
        // The rest of the keys get picked up in our Ship-Class down below

        // Initialize our ship
        game.ship = new Ship();
        this.addChild(game.ship);
    }
});