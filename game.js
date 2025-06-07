const buttonColours = [ "red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
// nextSequence
function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("Level "+level);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
// userClick
$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
$(document).one("keypress",function(){
    $("h1").text("Level "+level);
    nextSequence();
});
// checking answer
function checkAnswer(currentLevel){

if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
    console.log("next success");
    setTimeout(function(){
        nextSequence();
    },1000);
 }
}

else{
    playSound("wrong");
    $("body").addClass("game-over").dequeue().delay(200).queue(function () {
        $(this).removeClass("game-over");
    });
    $("h1").text("Game Over, Press Any Key to Restart");
    $(document).one("keypress",function(){
        startOver();
    });
}
}
// playSound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
// animate Press
function  animatePress(currentColour){
    $('.'+currentColour).addClass("pressed").dequeue().delay(100).queue(function () {
        $(this).removeClass("pressed");
    });
};
// restarting the game
function  startOver(){
   level = 0;
   gamePattern = [];
   nextSequence(); 
}