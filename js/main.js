// click on start game page get name
let startButton = document.querySelector(".start-game");
let theName = document.querySelector(".theName");
let playerName = document.querySelector(".info-game .name span");
let boxesContent = document.querySelector(".game-content");
let gameOver = document.querySelector(".over")
let boxes = Array.from(boxesContent.children);
let controlTime = document.querySelector(".tries p>span");
let maxWrongTries = document.querySelector(".wrong-tries span");
// function to check name of player & remove start game page 
startButton.onclick = function () {
    boxes.forEach((box) => {
        box.classList.add("flip");
            setTimeout(() => {
            box.classList.remove("flip");
        }, 2000);
    })

    let stopControlTime = setInterval(() => {
        controlTime.innerHTML--;
        if (controlTime.innerHTML === "0" || maxWrongTries.innerHTML == "0") {
        clearInterval(stopControlTime);
        document.querySelector(".end-game").innerHTML = "Game Over !";
        gameOver.classList.add("game-over");
        } else {
        winnerGame();
            
        }
    }, 1000);
    if (theName.value == null || theName.value == "") {
        playerName.innerHTML = "Unknown"
    } else {
        playerName.innerHTML = theName.value;
    }
    document.querySelector(".start-page").remove()
}
let duration = 1000;
let boxesRange = [...Array(boxes.length).keys()];
let back = document.querySelector(".back");
// function to shuffle Elements in boxesRange
shuffle(boxesRange);
// Add order style in css 
boxes.forEach(function (box, index) {
    box.style.order = boxesRange[index]
    box.addEventListener("click", function () { 
        flipBox(box);
        });
    }
)
// Function To add class (flip)
function flipBox(currentBox) {
    // add class flip to selected box
    currentBox.classList.add("flip")
    // 
    let flipSelected = boxes.filter((flipBox) => flipBox.classList.contains("flip"));
    // if there two boxes has class "flip"
    if (flipSelected.length == 2) {
        // Stop Click function
        stopClick()
        selectedBox(
        flipSelected[0],
        flipSelected[1]
        );
    }
}

// function to shuffle Elements in boxesRange
function shuffle(array) {
    let current = array.length,
        temp,
        randomNum;
    while (current > 0) {
        // get random Num
        randomNum = Math.floor(Math.random() * current);
        // array Of length - one 
        current--;
        //(1) save current Element in stach 
        temp = array[current];

        // (2)
        array[current] = array[randomNum];

        // (3)
        array[randomNum] = temp;

    }
    return array
}
        // Stop Click function

function stopClick() {
  // add class to stop click event duration
  boxesContent.classList.add("stop-click");
  // remove class "stop click" after [1] secound
  setTimeout(() => {
    boxesContent.classList.remove("stop-click");
  }, duration);
}

// function to check two box you selcted 
function selectedBox(boxOne, boxTwo) {
    if (boxOne.dataset.movies === boxTwo.dataset.movies) {
        boxOne.classList.remove("flip");
        boxTwo.classList.remove("flip");
        boxOne.classList.add("flip-two");
        boxTwo.classList.add("flip-two");
        document.getElementById("success").play()
    }else {
        maxWrongTries.innerHTML--;
        setTimeout(() => {
            boxOne.classList.remove("flip");
            boxTwo.classList.remove("flip");
        }, duration);
        document.getElementById("fail").play();
    }
    
}
// function if player is win 
function winnerGame() {
    let flipSelected = boxes.filter((flipBox) =>
    flipBox.classList.contains("flip-two")
    );
    if ((flipSelected.length == boxes.length)) {
        gameOver.classList.add("winner");
        document.querySelector(".end-game").innerHTML = "Winner ! , You'r Greate. ^^";
        controlTime.innerHTML = "0";
    }
}