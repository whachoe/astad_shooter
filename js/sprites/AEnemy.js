var AEnemy = enchant.Class.create(enchant.Sprite, {
    initialize: function(){
        this.hitcount = 0;

        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['img/a-32.png']; // set image
        var x = Math.min(284, Math.floor((Math.random() * 288) + 32));
        this.moveTo(x, 16);

        // Move Diagonally
        if (x < 160) movex = 150;
        else movex = -150;
        this.tl.moveBy(movex, 320, 75);        // set movement

        this.addEventListener('enterframe', function () {
            if(this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
                this.remove();
            }
        });

        game.enemiesOnScreen.addChild(this);     // add to canvas
    },
    remove: function () {
        game.enemiesOnScreen.removeChild(this);
    }
});