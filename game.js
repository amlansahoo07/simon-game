// Define the possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Initialize the game pattern and user clicked pattern arrays
var gamePattern = [];
var userClickedPattern = [];

// Variables to track the game state
var started = false;
var level = 0;

// Start the game on key press or tap (excluding instructions button tap)
$(document).on("keydown", function(event) {
  if (!started) {
    startGame();
  }
});

$(document).on("touchstart", function(event) {
  if (!started && !$(event.target).is("#instructions-button")) {
    startGame();
  }
});

// Toggle instruction visibility and button text
$("#instructions-button").click(function() {
  $("#instructions").toggle();
  var buttonText = $("#instructions").is(":visible") ? "Hide Instructions" : "Show Instructions";
  $("#instructions-button").text(buttonText);
});


// Handle button clicks
$(".btn").click(function() {
  if (started) { // Check if the game has started
    // Get the ID of the clicked button and add it to the user clicked pattern
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // Play the corresponding sound and animate the button press
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check the user's answer after each click
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Function to start the game
function startGame() {
  $("h1").html("Level " + level);
  nextSequence();
  started = true;
}

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
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
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
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Check the user's answer against the game pattern
function checkAnswer(currentLevel) {
  // Check if the user's clicked color matches the game pattern color at the current level
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("correct");

    // If the user has completed the current sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence after a 1-second delay to generate the next color
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // If the user's answer is incorrect
    console.log("wrong");
    // Play the wrong sound
    playSound("wrong");
    // Add the "game-over" class to the body for a visual indication of game over
    $("body").addClass("game-over");
    // Remove the "game-over" class after 200 milliseconds
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Change the heading to indicate the game is over and prompt to restart
    $("h1").html("Game Over, Press Any Key or Tap to Restart");
    // Call startOver to reset the game variables
    startOver();
  }
}

// Reset the game variables to their initial state
function startOver() {
  level = 0; // Reset the level to 0
  gamePattern = []; // Clear the game pattern
  started = false; // Set started to false to allow the game to be restarted
}
