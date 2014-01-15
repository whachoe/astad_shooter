var UEnemy = enchant.Class.create(enchant.Sprite, {
    initialize: function(){
        enchant.Sprite.call(this, 28, 28);
        var imagename = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
        this.image = game.assets[imagename]; // set image
        var orig_x = Math.min(284, Math.floor((Math.random() * 288) + 32));
        this.moveTo(orig_x, 16);

        if (imagename == 'img/avatars/michael.jpg') {
            this.tl.rotateBy(720, 300, enchant.Easing.QUINT_EASEOUT);
            this.tl.looped = true;
            this.addEventListener('enterframe', function () {
                this.y = this.y + 2;
            });
        } else if (imagename == 'img/avatars/milan.jpg') {
            this.direction = 1;
            this.addEventListener('enterframe', function () {
                if (Math.abs(orig_x - this.x) == 20) {
                    this.direction = this.direction * -1;
                }

                this.y = this.y + 2;
                this.x = this.x + 2*this.direction;
            });
        }
        else {
            this.tl.moveBy(0, 320, 150);        // set movement
        }

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