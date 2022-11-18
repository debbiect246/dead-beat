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
var beatsPerMin = 40;  // Set this to the BPM of the song
var beatsPerMillisecond = 60000 / beatsPerMin;
var notesPerBeat = 4; // Default 4/4 measure
var beatsPerBar = beatsPerMillisecond / notesPerBeat;
var beatsGroup;

function preload () {
    this.load.image('sky', './assets/images/sky.png');
    this.load.image('beat', './assets/images/beat.png');
    this.load.image('player', './assets/images/temp-player-sprite.png')
}


function create () {
    // Sky image (added as tileSprite to access the scrolling method)
    sky = this.add.tileSprite(400, 300, 800, 600, 'sky');

    // Create the group for beats
    beatsGroup = this.add.group();

    // Create a timed event that will spawn an object for each note, defined by BPM and notesPerBeat
    beatSpawnerEvent = this.time.addEvent({ delay: beatsPerBar, callback: beatSpawn, callbackScope: this, loop: true });
    beatRemoverEvent = this.time.addEvent({ delay: 1000, callback: beatRemover, callbackScope: this, loop: true });

    // Create the player sprite and remove gravity from it.
    player = this.physics.add.sprite(100, 150, 'player')
    player.setCollideWorldBounds(true)
    player.body.allowGravity = false
    
    // Create variable that stores common key inputs
    movementKeys = this.input.keyboard.createCursorKeys()

}


function update () {
    // Tells the sky to scroll at a specific speed
    sky.tilePositionY += 0.2;

    // Move the player on left and right key inputs
    if (movementKeys.left.isDown) {
        player.x -= 25
    } else if (movementKeys.right.isDown) {
        player.x += 25
    } else {
        player.setVelocityX(0)
    }
}


function beatSpawn() {
    // Creates the beat object, sets its capped velocity
    var beat = this.physics.add.sprite(100, 700,'beat');
    beat.setMaxVelocity(0 , 250);
    beat.setVelocityY(-250);
    beatsGroup.add(beat);
}

function beatRemover() {
    beatsGroup.children.each(function(beat) {
        if (beat.x < -100) {
            beat.destroy();
        };
    });
}
;