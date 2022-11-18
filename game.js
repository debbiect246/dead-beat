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
var notesPerBeat = 4; // Default 4/4 measure

var beatsPerMillisecond = 60000 / beatsPerMin;
var beatsPerBar = beatsPerMillisecond / notesPerBeat;
var beatsGroup;
// Sequence defines where the beats will spawn 1 to 4 are left to right, zero is no beat, on 4 notes per beat (default) 1,0,0,0 would be one note per beat)
var sequence = [1,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,1,0,1,0,2,0,2,0,3,0,3,0,4,0,4,0,2,2,2,2,3,3,3,3,1,1,1,1,4,4,4,4,2,3,2,3,2,3,2,3,2,3,2,3]
var currentNote = 0; // Where we currently are in the sequence
var spawnerPositions = {1:100, 2:300, 3:500, 4:700}; // Dictionary changes the notes to x-position on screen
var beatSpawnerEvent;


function preload () {
    this.load.image('sky', './assets/images/sky.png');
    this.load.image('beat', './assets/images/beat.png');
    this.load.image('gameFailed', './assets/images/game-failed.png');
}


function create () {
    // Sky image (added as tileSprite to access the scrolling method)
    sky = this.add.tileSprite(400, 300, 800, 600, 'sky');

    // Create the group for beats
    beatsGroup = this.add.group();

    // Create a timed event that will spawn an object for each note, defined by BPM and notesPerBeat
    beatSpawnerEvent = this.time.addEvent({ delay: beatsPerBar, callback: beatSpawn, callbackScope: this, loop: true });
    // Timed event runs once a second to remove missed beats
    beatRemoverEvent = this.time.addEvent({ delay: 1000, callback: beatRemover, callbackScope: this, loop: true });
    
}


function update () {
    // Tells the sky to scroll at a specific speed
    sky.tilePositionY += 0.2;
}


function beatSpawn() {
    // Creates the beat object, sets its capped velocity

    // Only executes if a note is needed
    if (currentNote < sequence.length && sequence[currentNote] != 0) {
        var xPos = spawnerPositions[sequence[currentNote]]; // Uses a dictionary to find where the beat should spawn on X pos
        var beat = this.physics.add.sprite(xPos, 700,'beat'); // Adds the beat object to the game
        beat.setMaxVelocity(0 , 250);  // Object cannot go faster than this
        beat.setVelocityY(-250); // Object instantly goes this fast
        beatsGroup.add(beat);  // Object added to a group that can be itterated over later for cleanup
    }
    currentNote++; // Moves to the next note in the sequence
    
    if (currentNote >= sequence.length) {
        timedEvent = this.time.delayedCall(2500, sequenceComplete, [], this);
    }
}

function beatRemover() {
    // Removes missed beats if they are off screen
    beatsGroup.children.each(function(beat) {
        if (beat.x < -100) {
            beat.destroy();
        };
    });
}

function sequenceComplete() {
    // When the sequence is over this runs and will eventually use a score to decide what to display
    beatSpawnerEvent.destroy();
    this.add.image(400,300, 'gameFailed');
}
;