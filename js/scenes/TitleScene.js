var TitleScene = enchant.Class.create(enchant.Scene, {
    // The main gameplay scene.
    initialize: function() {
        // 1 - Call superclass constructor
        Scene.apply(this);

        var startgame = new Sprite(236, 48);
        startgame.image = game.assets['img/start.png'];
        startgame.x = 45;
        startgame.y = 125;

        // On click: Start the game
        var gamescene = new Level1Scene();
        startgame.on("touchstart", function (){
            game.replaceScene(gamescene);
        });
        this.addChild(startgame);


        var spacestring = new enchant.Label();
        spacestring.text = "Press <space> to start";
        spacestring.x = 85;
        spacestring.y = 185;
        spacestring.font = "14px 'Arial'";
        spacestring.color = "#fc9a07";

        this.addChild(spacestring);

        // Space also starts the game
        this.on(enchant.Event.A_BUTTON_DOWN, function(){
            game.replaceScene(gamescene);
        });

    }
});