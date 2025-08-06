let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;//player1 , player2
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enabledBox();
    msgContainer.classList.add("hide");
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerText = "O";
            box.style.color = "#08BDBD"
            turn0 = false;
            count += 1;
        }
        else{
            box.innerText = "X";
            turn0 = true;
            count += 1;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disabledBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enabledBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! The Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBox();
};

const checkWinner = () => {
    let winnerFound = false;
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
    }
    // If all boxes are filled and no winner
    if(!winnerFound && count === 9){
        showtie();
    }
};
// to check the Tie

const showtie = () => {
    msg.innerText = "It is a Tie!";
    msgContainer.classList.remove("hide");
    disabledBox();
}

newGameButton.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);