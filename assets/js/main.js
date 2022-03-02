// SELECT START ELEMENT
const options = document.querySelector(".options");

// SELECT BUTTONS
const friendBtn = document.querySelector(".container");
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
const playBtn = document.querySelector(".play");

// GAME OVER ELEMENT
const gameOverElement = document.querySelector(".gameover");

const player = new Object;
let OPPONENT;

oBtn.addEventListener("click", function(){
    player.man = "O";
    player.computer = "X";
    player.friend = "X";

    switchActive(xBtn, oBtn);
});

xBtn.addEventListener("click", function(){
    player.man = "X";
    player.computer = "O";
    player.friend = "O";

    switchActive(oBtn, xBtn);
});
 

friendBtn.addEventListener("click", function(){
    OPPONENT = "friend";
    switchActive(computerBtn, friendBtn);
});

playBtn.addEventListener("click", function(){

    if( !player.man ){
        oBtn.style.backgroundColor = "#ffb861";
        xBtn.style.backgroundColor = "#ffb861";
        return;
    }
    
    init(player, OPPONENT);
    options.classList.add("hide");
});

function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}