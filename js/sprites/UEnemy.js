var UEnemy = enchant.Class.create(enchant.Sprite, {
    initialize: function(){
        enchant.Sprite.call(this, 28, 28);
        this.image = game.assets[possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)]]; // set image
        this.moveTo(Math.min(284, Math.floor((Math.random() * 288) + 32)), 16);
        this.tl.moveBy(0, 320, 150);        // set movement
        game.currentScene.addChild(this);     // add to canvas
    },
    remove: function () {
        game.currentScene.removeChild(this);
        delete game.enemiesOnScreen[this.key];
    }
});