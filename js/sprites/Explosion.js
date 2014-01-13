var Explosion =  enchant.Class.create(enchant.Sprite, {
    initialize: function(x,y) {
        game.assets['sounds/shot5.wav'].play();
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['img/effect0.png'];
        this.frame = 1;
        this.x = x;
        this.y = y;

        game.currentScene.addChild(this);

        // Remove this image in a few moments
        var expl = this;
        setTimeout(function() {
            expl.remove();
        }, 200);

    },
    remove: function () {
        game.currentScene.removeChild(this);
    }
});