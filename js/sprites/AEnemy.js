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

        game.currentScene.addChild(this);     // add to canvas
    },
    remove: function () {
        game.currentScene.removeChild(this);
        delete game.enemiesOnScreen[this.key];
    }
});