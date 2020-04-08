const pcAnswer = ["rock", "paper", "scissors"];
const pc = $(".pc");
const player = $(".player");

// es startet immer mit der leichtesten stufe
var strategy = "random";

// die Player variablen
var currentlyFighting = false;
var playerPoints = 0;
var playerPattern= [];

// die Bot variablen
var pcPoints = 0;
var pcLostLastRound = false;
var pcLostAgainst = "";
var pcChoice = "";
var lastChoices = "";

$(".button").on("click", function(event) {
    if (!currentlyFighting) {
        currentlyFighting = true;
        let playerChoice = event.target.id;

        // wenn man auf den knopf drückt wird der button orange
        $(`#${playerChoice}`).addClass("pressed");

        playerPattern.push(playerChoice);

        // das Player fragezeichen wird zu dem ausgewählten
        player.removeClass("fa-question");
        player.addClass(`fa-hand-${playerChoice}`);

        // je eingestellter schwierigkeit macht der computer eine Aktion
        if (strategy === "random") {
            pcChoice = pcEasyAI();

        } else if (strategy === "short" || strategy === "wide") {
            pcChoice = pcNormalHardAI(strategy);


        } else if (strategy === "denizStrat") {
            pcChoice = pcDenizStratAI();
        }


        // wer hat gewonnen?
        gameLogic(playerChoice, pcChoice);

        // alles wird aufgeräumt und für die nächste Runde vorbereitet
        setTimeout(function() {
            player.removeClass(`fa-hand-${playerChoice}`);
            player.addClass("fa-question");

            pc.removeClass(`fa-hand-${pcChoice}`);
            pc.addClass("fa-question");

            $(".title").text("Choose your Fighter!");
            $(`#${playerChoice}`).removeClass("pressed");

            $(".playerPoints").text(`Player:${playerPoints}`)
            $(".pcPoints").text(`PC:${pcPoints}`)

            currentlyFighting = false;

        }, 1500);
    }
});


// ändert die schwierigkeit
$(".selectStrategy").on("change", function(event) {
    strategy = event.target.value;
});


// der Bot sucht sich random was aus und wählt es
function pcEasyAI() {
    let randomSign = Math.floor(Math.random() * 3);
    pcChoice = pcAnswer[randomSign];

    changePcIcon(pcChoice);

    return pcChoice;
}


// der Bot  analysiert je nach schwierigkeit
function pcNormalHardAI(strategy) {
    let rock = 0;
    let paper = 0;
    let scissors = 0;


    if(strategy === "short"){
        lastChoices = lastMultiple(3);

    }else if(strategy === "wide"){
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


    if((lastChoices.length === 8 && lastChoices[3] === undefined) || (lastChoices.length === 3 && lastChoices[0] === undefined)){
        pcChoice = pcEasyAI();
    }

    if (rock >= paper && rock >= scissors) {
        pcChoice = "paper";
    }

    if (paper >= rock && paper >= scissors) {
        pcChoice = "scissors";
    }

    if (scissors >= rock && scissors >= scissors) {
        pcChoice = "rock";
    }

    console.log(lastChoices);

    changePcIcon(pcChoice);

    return pcChoice;
}


// der Bot weiß immer was der Player pickt und macht
function pcDenizStratAI() {
    let pcChoice = "rock";
    if (pcLostLastRound){
        pcChoice = pcLostAgainst;
    }

    changePcIcon(pcChoice);

    return pcChoice;
}


// ändert die Bot fragezeichen zu dem ausgewählten
function changePcIcon(pcChoice) {
    pc.removeClass("fa-question");
    pc.addClass(`fa-hand-${pcChoice}`);
}


// gibt ein array mit den letzten aktionen des Players zurück
function lastMultiple(num){
    let len = playerPattern.length;
    let lastNum = [];

    for(let i = len - num; i < len; i++){
        lastNum.push(playerPattern[i]);
    }

    return lastNum;
}


// schaut wer mit seiner Auswahl gewonnen hat
function gameLogic(playerChoice, pcChoice) {
    if (playerChoice === pcChoice) {
        $(".title").text("Its a TIE!");
    }

    if (playerChoice === "rock") {
        if (pcChoice === "paper") {
            $(".title").text("PC WINS!");
            pcPoints += 1;
            pcLostLastRound = false;

        }
        if (pcChoice === "scissors") {
            $(".title").text("Player WINS!");
            playerPoints += 1;
            pcLostLastRound = true;
            pcLostAgainst = "rock"
        }
    }

    if (playerChoice === "paper") {
        if (pcChoice === "scissors") {
            $(".title").text("PC WINS!");
            pcPoints += 1;
            pcLostLastRound = false;
        }
        if (pcChoice === "rock") {
            $(".title").text("Player WINS!");
            playerPoints += 1;
            pcLostLastRound = true;
            pcLostAgainst = "paper"
        }
    }

    if (playerChoice === "scissors") {
        if (pcChoice === "rock") {
            $(".title").text("PC WINS!");
            pcPoints += 1;
            pcLostLastRound = false;
        }
        if (pcChoice === "paper") {
            $(".title").text("Player WINS!");
            playerPoints += 1;
            pcLostLastRound = true;
            pcLostAgainst = "scissors"
        }
    }
}
