// SELECT START ELEMENT
const options = document.querySelector(".options");

// SELECT BUTTONS
const friendBtn = document.querySelector(".container");
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
const playBtn = document.querySelector(".play");
const prevNext = document.querySelector(".history")


// GAME OVER ELEMENT
const gameOverElement = document.querySelector(".gameover");

const player = new Object;
let OPPONENT;

oBtn.addEventListener("click", function(){
    player.man = "O";
    player.friend = "X";

    switchActive(xBtn, oBtn);
});

xBtn.addEventListener("click", function(){
    player.man = "X";
    player.friend = "O";

    switchActive(oBtn, xBtn);
});
 

friendBtn.addEventListener("click", function(){
    OPPONENT = "friend";
});

playBtn.addEventListener("click", function(){

    if( !player.man ){
        oBtn.style.backgroundColor = "#ffb861";
        xBtn.style.backgroundColor = "#ffb861";
        return;
    }
    
    init(player, OPPONENT);
    options.classList.add("hide");
    prevNext.style.display = "flex";
});

function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}

function storeScore(){
    localStorage.setItem("xscr", 0) 
    localStorage.setItem("oscr", 0) 
    console.log(localStorage.getItem('xscr'))
    console.log(localStorage.getItem('oscr'))
}

function openToDos() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("myQoutes").style.display = "none"
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}