const pcAnswer = ["rock", "paper", "scissors"];
const player = $(".player");
const pc = $(".pc");

var currentlyFighting = false;
var playerPoints = 0;
var pcPoints = 0;

var difficulty = "easy";

var playerPattern= [];

$(".button").on("click", function(event) {
    if (!currentlyFighting) {
        currentlyFighting = true;
        let playerChoice = event.target.id;

        playerPattern.push(playerChoice);

        $(`#${playerChoice}`).addClass("pressed");
        setTimeout(function() {
            $(`#${playerChoice}`).removeClass("pressed");
        }, 1500);

        player.removeClass("fa-question");
        player.addClass(`fa-hand-${playerChoice}`);

        let pcChoice = "";

        if (difficulty === "easy") {
            pcChoice = pcEasyAI();

        } else if (difficulty === "normal" || difficulty === "hard") {
            pcChoice = pcNormalHardAI(difficulty);

        } else if (difficulty === "unbeatable") {
            pcChoice = pcUnbeatableAI(playerChoice);
        }

        gameLogic(playerChoice, pcChoice);

        setTimeout(function() {
            player.removeClass(`fa-hand-${playerChoice}`);
            player.addClass("fa-question");

            pc.removeClass(`fa-hand-${pcChoice}`);
            pc.addClass("fa-question");

            $(".title").text("Choose your Fighter!");

            $(".playerPoints").text(`Player:${playerPoints}`)
            $(".pcPoints").text(`PC:${pcPoints}`)
            currentlyFighting = false;
        }, 1500);


    }
});

$(".selectDifficulty").on("change", function(event) {
    let selectedDifficulty = event.target.value;
    difficulty = selectedDifficulty;
});

function pcEasyAI() {
    let randomSign = Math.floor(Math.random() * 3);
    let pcChoice = pcAnswer[randomSign];

    changePcIcon(pcChoice);

    return pcChoice;
}

function pcNormalHardAI(difficulty) {

    let rock = 0;
    let paper = 0;
    let scissors = 0;

    let pcChoice = "";
    let lastChoices = "";

    if(difficulty === "normal"){
        lastChoices = lastMultiple(3);

    }else if(difficulty === "hard"){
        lastChoices = lastMultiple(8);
    }


    for(choice of lastChoices){
        if (choice === "rock") {
            rock += 1;
        } else if (choice === "paper") {
            paper += 1;
        } else if(choice === "scissors"){
            scissors += 1;
        }else{
            continue;
        }
    }

    console.log(lastChoices);

    if(lastChoices[3] === undefined){
        pcChoice = pcEasyAI();

    }else if (rock >= paper && rock >= scissors) {
        pcChoice = "paper";

    } else if (paper >= rock && paper >= scissors) {
        pcChoice = "scissors";

    } else if (scissors >= rock && scissors >= scissors) {
        pcChoice = "rock";

    }

    changePcIcon(pcChoice);

    return pcChoice;
}

function pcUnbeatableAI(playerChoice) {
    let pcChoice = ""
    if (playerChoice === "rock") {
        pcChoice = "paper";
    } else if (playerChoice === "paper") {
        pcChoice = "scissors";
    } else if (playerChoice === "scissors") {
        pcChoice = "rock";
    }

    changePcIcon(pcChoice);

    return pcChoice;
}

function changePcIcon(pcChoice) {
    pc.removeClass("fa-question");
    pc.addClass(`fa-hand-${pcChoice}`);
}

function lastMultiple(num){
    let len = playerPattern.length;
    let lastNum = [];

    for(let i = len - num; i < len; i++){
        lastNum.push(playerPattern[i]);
    }

    return lastNum;
}

function gameLogic(playerChoice, pcChoice) {
    if (playerChoice === pcChoice) {
        $(".title").text("Its a TIE!");
    }

    if (playerChoice === "rock") {
        if (pcChoice === "paper") {
            $(".title").text("PC WINS!");
            pcPoints += 1;

        }
        if (pcChoice === "scissors") {
            $(".title").text("Player WINS!");
            playerPoints += 1;
        }
    }

    if (playerChoice === "paper") {
        if (pcChoice === "scissors") {
            $(".title").text("PC WINS!");
            pcPoints += 1;
        }
        if (pcChoice === "rock") {
            $(".title").text("Player WINS!");
            playerPoints += 1;
        }
    }

    if (playerChoice === "scissors") {
        if (pcChoice === "rock") {
            $(".title").text("PC WINS!");
            pcPoints += 1;
        }
        if (pcChoice === "paper") {
            $(".title").text("Player WINS!");
            playerPoints += 1;
        }
    }
}
