const body = document.querySelector("body");

const game = document.querySelector(".game");
const menu = document.querySelector(".menu");
const result = document.querySelector(".result");

const themeBtn = document.querySelector(".theme");
const themeIcon = document.querySelector(".theme-icons");

// menu

const menu_self = document.getElementById("menu-self");
const menu_comp = document.getElementById("menu-comp");

menu_self.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "flex";
    game.setAttribute("data-type", "self");
});

menu_comp.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "flex";
    game.setAttribute("data-type", "comp");
});

// game

if (game.getAttribute("data-type") == "self") {
    console.log("self game");
}
const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cell_elements = document.querySelectorAll(".cell");
const board = document.querySelector(".board");

let x_turn;

function startGame() {
    x_turn = true;
    cell_elements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHover();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = x_turn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHover();
    }
}

function isDraw() {
    return [...cell_elements].every((element) => {
        return (
            element.classList.contains(X_CLASS) ||
            element.classList.contains(O_CLASS)
        );
    });
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cell_elements[index].classList.contains(currentClass);
        });
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    x_turn = !x_turn;
}

function setBoardHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (x_turn) {
        board.classList.add(X_CLASS);
    } else {
        board.classList.add(O_CLASS);
    }
}

function endGame(draw) {
    game.style.display = "none";
    result.style.display = "flex";
    const resultText = document.querySelector(".resultText");
    if (draw) {
        resultText.innerText = "Game Draw!";
    } else {
        resultText.innerText = `${
            x_turn ? X_CLASS.toUpperCase() : O_CLASS.toUpperCase()
        } Wins!`;
    }
}

startGame();

const game_re_start = document.getElementById("game-re-start");
const game_back = document.getElementById("game-back");

game_re_start.addEventListener("click", startGame);
game_back.addEventListener("click", () => {
    startGame();
    game.style.display = "none";
    menu.style.display = "flex";
});

// result

const result_re_match = document.getElementById("result-re-match");
const result_menu = document.getElementById("result-menu");

result_re_match.addEventListener("click", () => {
    result.style.display = "none";
    game.style.display = "flex";
    startGame();
});

result_menu.addEventListener("click", () => {
    window.location.reload();
});

// theme

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

themeBtn.addEventListener("click", () => {
    let theme = body.classList[0];
    console.log(theme);
    if (theme === THEME_DARK) {
        body.classList.remove(THEME_DARK);
        body.classList.add(THEME_LIGHT);
        themeIcon.style.top = "-80%";
    } else {
        body.classList.remove(THEME_LIGHT);
        body.classList.add(THEME_DARK);
        themeIcon.style.top = "0";
    }
});
