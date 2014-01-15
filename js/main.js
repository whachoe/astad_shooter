
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
    game.preload('img/ship-32.png', 'img/icon0.png', 'img/a-32.png', 'img/effect0.png', 'img/game-over.jpg', 'img/start.png');
    game.preload(possibleEnemies);

    // Sound assets
    game.preload('sounds/laser.wav', 'sounds/shot5.wav', 'sounds/johnson-long-version.mp3', 'sounds/se4.wav');

    // Styling
    game.fps = 60;
    game.scale = 1;

    game.onload = function() {
        // Load the title screen
        var titlescreen = new TitleScene();
        game.pushScene(titlescreen);
    };

    game.start(); //Begin the game
    window.scrollTo(0, 0);
}

