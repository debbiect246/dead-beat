# 🎸 **Dead-beat** 👽 
## *Help! Our dead-beat sprite is on a rhythm fueled collision course with the earth. Move dead-beat to the groove of the music, and catch as many parachute material patches as he falls through the rhythm of the sky*

## Wireframes for the game

![wireframes](wireframes/dead-beat-wireframes.pdf)

## How to play

* Arrow keys - move left and right
* Spacebar - Collect parachute material
* Get as many, if not all the parachute material to win, aiming for the highest score

## Setup

### Deployed link

[Click here to play!](https://debbiect246.github.io/dead-beat/)

### Development

## Game

1. Variables
- Initialise variables
- Set a BPM to the song with a default of 4/4 measure
- Sequence defines where the beats will spawn 1 to 4 are left to right, zero is no beat, on 4 notes per beat (default) 1,0,0,0 would be one note per beat
- Dictionary changes the notes to x-position on screen
- Multiplier determines how much the score is incremented for each beat hit accurately

2. Functions
- Preload
- Create
-   Sky image (added as tileSprite to access the scrolling method)
-   Create the group for beats
-   Create a timed event that will spawn an object for each note, defined by BPM and notesPerBeat
-   Timed event runs once a second to remove missed beats
-   Create the player sprite and remove gravity from it
-   Create variable that stores common key inputs
-   Check for overlap between player and beat
-   Displays the current score and multiplier
- Update
-   Tells the sky to scroll at a specific speed
-   Move the player on left and right key inputs
- DashLeft
-   Checks the current player position and creates a target that is 200px to the left of that
-   Prevents the user from dashing again for a a short period once the target destination is reached
- DashRight
-   Checks the current player position and creates a target that is 200px to the right of that
-   Prevents the user from dashing again for a a short period once the target destination is reached
- CheckSpacebarInput
-   If space is hit whilst the player and a beat overlap, this function is called
-   Triggers the increment score function and destroys the current beat
- IncrementScore
-   Increases the score by (10 * score multiplier)
-   Then increases the multiplier by 0.2x if it is less then the cap which is 5.0x
-   Edits game text accordingly
- BeatSpawn
-   Creates the beat object, sets its capped velocity
-   Only executes if a note is needed
-   Moves to the next note in the sequence
- BeatRemover
-   Removes missed beats if they are off screen
- SequenceComplete
-   When the sequence is over this runs and will eventually use a score to decide what to display


## Credits

* [freepik](https://www.freepik.com/search?color=orange&format=search&query=patches&type=icon)
* [freeSFX](https://freesfx.co.uk/)

##Linked in details of team members
* [Kelvin Ward](https://www.linkedin.com/in/kelvinhere/)
* [Shaun Buck](https://www.linkedin.com/in/shaun-buck-749093221/)
* [Debbie Thompson](//www.linkedin.com/in/debbie-thompson-1baa4733/)
* [Cameron Cove-Crichton](https://www.linkedin.com/in/cameron-cove-crichton-8aa332198/)
