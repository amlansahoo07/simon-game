// Define the possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Initialize the game pattern and user clicked pattern arrays
var gamePattern = [];
var userClickedPattern = [];

// Variables to track the game state
var started = false;
var level = 0;

// Start the game on a key press
$(document).keydown(function() {
    if (!started) {
        // Update the level title and start the first sequence
        $("h1").html("Level " + level);
        nextSequence();
        started = true;
    }
});

// Handle button clicks
$(".btn").click(function() {
    // Get the ID of the clicked button and add it to the user clicked pattern
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    // Play the corresponding sound and animate the button press
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check the user's answer after each click
    checkAnswer(userClickedPattern.length - 1);
});

// Generate the next sequence in the game pattern
function nextSequence() {
    // Reset the user clicked pattern for the new level
    userClickedPattern = [];
    level++; // Increment the level

    // Update the level title
    $("h1").html("Level " + level);

    // Select a random color and add it to the game pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    // Animate the selected button and play its sound
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Play the corresponding sound for a given color
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// Animate a button press by adding and removing the "pressed" class
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Check the user's answer against the game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("correct");

        // If the user has finished the sequence, call nextSequence after a delay
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
    }
}
