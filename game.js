var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: -200 },
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

// Initialise variables
var beatsPerMin = 80;  // Set this to the BPM of the song
var beatsPerMillisecond = 60000 / beatsPerMin;
var beatsPerBar;

function preload () {
    this.load.image('sky', './assets/images/sky.png');
    this.load.image('beat', './assets/images/beat.png');
}


function create () {
    // Sky image (added as tileSprite to access the scrolling method)
    sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
    // Create a timed event that will spawn an object for each beat of the music (to be quartered eventually for 1/4 notes)
    timedEvent = this.time.addEvent({ delay: beatsPerMillisecond, callback: beatSpawn, callbackScope: this, loop: true });
    
}


function update () {
    // Tells the sky to scroll at a specific speed
    sky.tilePositionY += 0.2;
}


function beatSpawn() {
    // Creates the beat object, sets its capped velocity
    var beat = this.physics.add.sprite(100, 700,'beat');
    beat.setMaxVelocity(0 , 250);
    beat.setVelocityY(-250);
}
;