const pcAnswer = ["rock", "paper", "scissors"];
const player = $(".player");
const pc = $(".pc");

var currentlyFighting = false;
var playerPoints = 0;
var pcPoints = 0;

$(".button").on("click", function(event) {
    if (!currentlyFighting) {
        currentlyFighting = true;
        let playerChoice = event.target.id;

        $(`#${playerChoice}`).addClass("pressed");
        setTimeout(function() {
            $(`#${playerChoice}`).removeClass("pressed");
        }, 1000);

        player.removeClass("fa-question");
        player.addClass(`fa-hand-${playerChoice}`);

        let pcChoice = pcRandomAI();


        gameLogic(playerChoice, pcChoice);


        currentlyFighting = false;

        setTimeout(function() {
            player.removeClass(`fa-hand-${playerChoice}`);
            player.addClass("fa-question");

            pc.removeClass(`fa-hand-${pcChoice}`);
            pc.addClass("fa-question");

            $(".title").text("Choose your Fighter!");

            $(".playerPoints").text(`Player:${playerPoints}`)
            $(".pcPoints").text(`PC:${pcPoints}`)

        }, 1000);
    }
});

function pcRandomAI() {
    let randomSign = Math.floor(Math.random() * 3);
    let pcChoice = pcAnswer[randomSign];

    pc.removeClass("fa-question");
    pc.addClass(`fa-hand-${pcChoice}`);

    return pcChoice;
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
