var buttonsColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false
var level = 0

// Press key to start the game
$(document).keypress(function (event) {
    if(event.which == 97){
        if(!started){
            nextSequence()
            started = true
        }
    }
})

// Check Which Button is Pressed
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    
    // Add Sounds to Button Clicks
    playSound(userChosenColour)
    animatePress(userChosenColour)

    // 2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1)
})

//  Check the User's Answer
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press A Key to Restart")
        startOver()
    }
}
function startOver() {
    started = false
    level = 0
    gamePattern = []
}
// Radom Pattern choose
function nextSequence() {
    // Reset userClickedPattern
    userClickedPattern =[]
    // When nextSequence() is called, increase the level by 1 
    $("h1").text("Level " + level)
    level++
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonsColours[randomNumber]
    gamePattern.push(randomChosenColour)
    
    // Show the Sequence to the User with Animations and Sounds
    $("#"+randomChosenColour).delay(100).fadeOut("fast").fadeIn("fast")
    playSound(randomChosenColour)
    
} 

// Create PlaySound function
function playSound(name) {
    $("." + name +"-sound")[0].play()
    // var audio = new Audio("sounds/"+randomChosenColour+".mp3")
    // audio.play()
}

// Add Animations to User Clicks
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed")
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed")
    }, 100);
}