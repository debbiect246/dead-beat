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
    sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
}

function update () {
    sky.tilePositionY += 0.2;
}
