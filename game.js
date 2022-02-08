var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var currentLevel;
var index;
var flag =0;
// alert(randomNumber);
$(document).on("keypress",function(e){
    console.log(e.key);
   if(e.key=="A" || e.key=="a"){
    nextSequence();
   }
});
$(".startButton").click(function(){
    nextSequence();
});
function nextSequence(){
    if(level==0){
        $(".startButton").show();
    }
    else if(level>0){
        $(".startButton").hide();
    }
    if(flag==0){
        level++;
        currentLevel = level;
        $(".startButton").hide();
    }
    else{
        level=0;
        level++;
        currentLevel = level;
        gamePattern.splice(0,gamePattern.length);
        flag=0;
    }
    $("h1").text("Level: "+level);
   
    userClickedPattern.splice(0,userClickedPattern.length);
    
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(userClickedPattern);
    console.log(gamePattern);
    $("#"+randomChosenColour).addClass("pressed");
    playSound(randomChosenColour);
    setTimeout(()=>{
        $("#"+randomChosenColour).removeClass("pressed");
    },100);
    $(".btn").click(function(e){
        e.stopImmediatePropagation();
        // console.log("Clicked");
        var selectedBtn = $(this).attr("id");
        userClickedPattern.push(selectedBtn);
        animatePress(selectedBtn);
        playSound(selectedBtn);
        // currentLevel--;
        checkAnswer(currentLevel,userClickedPattern.length - 1);
    });
}

function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();   
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        },100);
}
function checkAnswer(currentLevel,index){    
    if(userClickedPattern[index] == gamePattern[index]){
        playSound(userClickedPattern[index]);        
    }
    else{
        playSound("wrong"); 
        flag=1;       
    }
    if(currentLevel == index+1 && flag==0){
        setTimeout(function(){
            // console.log("Next Level");
            nextSequence();
        },1000)
    }
    else if(flag==1){
        $(".startButton").show();
        $("h1").text("Game Over!!! Press A To Restart");
    }
}
