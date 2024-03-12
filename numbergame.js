
var correctSound = new Audio("http://soundbible.com/grab.php?id=1003&type=wav");
var incorrectSound = new Audio("http://soundbible.com/grab.php?id=1645&type=wav");
var counter = 0;
var randomNumber = randomnumbergenerator();

function randomnumbergenerator() {
    var num;
    num = Math.floor(Math.random() * 100) + 1;
    return num;
}

function counterupdate() {
    counter++;
    document.getElementById("attemptCounter").textContent = "Attempts: " + counter;
}

function show_user_History(guess, feedback) {
    var History;
    History = document.getElementById("History");
    var Item_list;
    Item_list = document.createElement("li");
    Item_list.textContent = "user Guess: " + guess + ", Feedback: " + feedback;
    History.appendChild(Item_list);
}

function restart_game() {

    randomNumber = randomnumbergenerator();
    document.getElementById("userInput").value = "";
    document.getElementById("attemptCounter").textContent = "";
    document.getElementById("Feedback").textContent = "";
    document.getElementById("History").textContent = "";
    counter = 0;
    // location.href = "/Index.html"
}

function guess_logic() {
    var player_guess = document.getElementById("userInput").value;
    console.log("User's guess:", player_guess);

    if (player_guess == randomNumber) {
        document.getElementById("Feedback").textContent = "Congratulations! You guessed it!";
        Feedback.style.backgroundColor = "lightgreen";
        generate_sound(true);
    }
    else if (player_guess < randomNumber) {
        document.getElementById("Feedback").textContent = "Too low. Try again!";
        Feedback.style.backgroundColor = "red";
        Annimation();
        generate_sound(false);
    }
    else {
        document.getElementById("Feedback").textContent = "Too high. Try again!";
        Feedback.style.backgroundColor = "yellow";
        Annimation();
        generate_sound(false);
    }
    counterupdate();
    document.getElementById("restart_game").style.display = "block";
    show_user_History(player_guess, document.getElementById("Feedback").textContent);
}
document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        guess_logic();
    }
});
document.getElementById("restart_game").addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", null);
});

document.getElementById("dropZone").addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.getElementById("dropZone").addEventListener("drop", function (event) {
    restart_game();
    event.preventDefault();
});
function Annimation() {
    var Feedback = document.getElementById("Feedback");
    Feedback.classList.add("annimation");
    Feedback.addEventListener("animationend", function () {
        Feedback.classList.remove("annimation");
    });
}

function generate_sound(isCorrect) {
    if (isCorrect) {
        correctSound.play();
    } else {
        incorrectSound.play();
    }
}

document.getElementById("submitGuess").addEventListener("click", function () {
    guess_logic();
});



