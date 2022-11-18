var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Create game object
var game = new Phaser.Game(config);


function preload () {
    this.load.image('sky', './assets/images/sky.png');
    // Set up sky for scrolling
}


function create () {
    // Sky image
    this.add.image(400,300, 'sky');
}

function update () {
}
