var Level1Scene = enchant.Class.create(enchant.Scene, {
    // The main gameplay scene.
    initialize: function() {
        //var game;

        // 1 - Call superclass constructor
        Scene.apply(this);

        // 2 - Access to the game singleton instance
        // game = Game.instance;
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
        this.addChild(scoreLabel);

        // generate enemy every 120 frames
        this.tl.then(function() {
            var enemy = new AEnemy();
            enemy.key = game.enemiesOnScreen.push(enemy) - 1;
        }).delay(120).loop();

        // generate enemy every 30 frames
        this.tl.then(function() {
            var enemy = new UEnemy();
            enemy.key = game.enemiesOnScreen.push(enemy) - 1;
        }).delay(15).loop();


        // Setup our keyboard listeners
        this.on(enchant.Event.A_BUTTON_DOWN, function(){
            var laser = new Laser();
        });
        // The rest of the keys get picked up in our Ship-Class down below

        // Show our ship
        this.addChild(game.ship);
    }
});