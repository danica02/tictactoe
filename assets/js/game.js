function init(player, OPPONENT){
    // SELECT CANVAS
    const canvas = document.getElementById("cvs");
    const ctx = canvas.getContext("2d");

    // BOARD VARIABLES
    let board = [];
    const COLUMN = 3;
    const ROW = 3;
    const SPACE_SIZE = 166.67;

    // STORE PLAYER'S MOVES
    let gameData = new Array(9);
    
    // By default the first player to play is the human
    let currentPlayer = player.man;

    // load X & O images
    const xImage = new Image();
    xImage.src = "assets/images/X.png";

    const oImage = new Image();
    oImage.src = "assets/images/O.png";

    var showLocalX = localStorage.getItem('xscr')
    var showLocalO = localStorage.getItem('oscr')

    var xscore = parseInt(showLocalX);
    var oscore = parseInt(showLocalO);
     
    var coord 
    var previous = []
    var nextBtn = []

    var nextHistory = []
    var nextHistoryStorage = []

    // Win combinations
    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // FOR GAME OVER CHECK
    let GAME_OVER = false;
    
    // DRAW THE BOARD
    function drawBoard(){
        // WE give every space a unique id
        // So we know exactly where to put the player's move on the gameData Array
        let id = 0
        for(let i = 0; i < ROW; i++){
            board[i] = [];
            for(let j = 0; j < COLUMN; j++){
                board[i][j] = id;
                id++;

                // draw the spaces
                ctx.strokeStyle = "#000";
                ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
            }
        }
    }
    drawBoard();

    // ON PLAYER'S CLICK
    canvas.addEventListener("click", function(event){
        
        // IF IT's A GAME OVER? EXIT
        if(GAME_OVER) return;

        // X & Y position of mouse click relative to the canvas
        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;

        // WE CALCULATE i & j of the clicked SPACE
        let i = Math.floor(Y/SPACE_SIZE);
        let j = Math.floor(X/SPACE_SIZE);

        // Get the id of the space the player clicked on
        let id = board[i][j];

        // displayHistory
        var historyContainer = document.getElementById("displayHistory")
        var pTag = document.createElement('p')
        var moveContent = document.createTextNode(`Tile ${id + 1} was selected`)
        pTag.appendChild(moveContent)
        historyContainer.appendChild(pTag)
        
        //push player 
        previous.push(id);
        // console.log(previous);

        // Prevent the player to play the same space twice
        if(gameData[id]) return;

        // store the player's move to gameData
        gameData[id] = currentPlayer;
        
        // draw the move on board
        drawOnBoard(currentPlayer, i, j);

        nextHistory.push([currentPlayer, i, j])
        // console.log(nextHistory)

        // Check if the play wins
        if(isWinner(gameData, currentPlayer)){
            showGameOver(currentPlayer);
            if(currentPlayer == "X"){
                let localXint = parseInt(showLocalX)
                localXint += 1
                xscore += 1
                localStorage.setItem("xscr", localXint)
                displayScore()
            }else if (currentPlayer == "O"){
                let localOint = parseInt(showLocalO)
                localOint += 1
                oscore += 1
                localStorage.setItem("oscr", localOint)
                displayScore()
            }
            GAME_OVER = true;
            return;
        }
        

        // check if it's a tie game
        if(isTie(gameData)){
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }else{
            // GIVE TURN TO THE OTHER PLAYER
            currentPlayer = currentPlayer == player.man ? player.friend : player.man;
        }
        
    });

    function prevCoordinates(){
        var removeMove = nextHistory.pop()
        var popPrev = previous.pop()
        nextBtn.push(popPrev)
        if (popPrev == 0){
            coord = [1, 1, 160, 160]
        } else if (popPrev == 1){
            coord = [168, 1, 160, 160]
        } else if (popPrev == 2){
            coord = [335, 1, 160, 160]
        } else if (popPrev == 3){
            coord = [1, 168, 160, 160]
        } else if (popPrev == 4){
            coord = [168, 168, 160, 160]
        } else if (popPrev == 5){
            coord = [335, 168, 160, 160]
        } else if (popPrev == 6){
            coord = [1, 335, 160, 160]
        } else if (popPrev == 7){
            coord = [168, 335, 160, 160]
        } else if (popPrev == 8){
            coord = [335, 335, 160, 160]
        }

        nextHistoryStorage.push(removeMove)
    }

    function nextCoordinates(){
        var indexFinder = nextHistoryStorage.length - 1
        var image = nextHistoryStorage[indexFinder][0]
        var coor1 = nextHistoryStorage[indexFinder][1]
        var coor2 = nextHistoryStorage[indexFinder][2]
        drawOnBoard(image, coor1, coor2)
        console.log(nextHistoryStorage)

        var returnHistory = nextHistoryStorage.pop()
        nextHistory.push(returnHistory)
    }


    var nxtButton = document.getElementById("next");
    nxtButton.addEventListener("click", nextCoordinates);

    // GET EMPTY SPACES
    function getEmptySpaces(gameData){
        let EMPTY = [];

        for( let id = 0; id < gameData.length; id++){
            if(!gameData[id]) EMPTY.push(id);
        }

        return EMPTY;
    }

    // GET i AND j of a SPACE
    function getIJ(id){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j] == id) return { i : i, j : j}
            }
        }
    }

    // check for a winner
    function isWinner(gameData, player){
        for(let i = 0; i < COMBOS.length; i++){
            let won = true;

            for(let j = 0; j < COMBOS[i].length; j++){
                let id = COMBOS[i][j];
                won = gameData[id] == player && won;
            }

            if(won){
                return true;
            }
        }
        return false;

    }

    // Check for a tie game
    function isTie(gameData){
        let isBoardFill = true;
        for(let i = 0; i < gameData.length; i++){
            isBoardFill = gameData[i] && isBoardFill;
        }
        if(isBoardFill){
            return true;
        }
        return false;
    }

    // SHOW GAME OVER
    function showGameOver(player){
        let message = player == "tie" ? "Oops No Winner" : "The Winner is";
        let imgSrc = `assets/images/${player}.png`;


        gameOverElement.innerHTML = `
            <h1>${message}</h1>
            <img class="winner-img" src=${imgSrc} </img>
            <div class="playerScore" id="displayScore">
                <p id="xScore">X score: <span data-x-score></span></p>
                <p id="oScore">O score: <span data-o-score></span></p>
            </div>
            <div class="playContainer">
                <div class="play" onclick="location.reload()">Rematch</div>
                <div class="play" onclick="location.reload()">Play Again</div>
            </div>
        `;

        gameOverElement.classList.remove("hide");
        prevNext.style.display = "none";
    }

    // draw on board
    function drawOnBoard(player, i, j){
        let img = player == "X" ? xImage : oImage;

        // the x,y positon of the image are the x,y of the clicked space
        ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE);
    }

    function displayScore(){
        document.querySelector('[data-x-score]').textContent = xscore
        document.querySelector('[data-o-score]').textContent = oscore
        
    }

    function removeImg(){  
        prevCoordinates()
        ctx.clearRect(coord[0], coord[1], coord[2], coord[3]);
    }

    var removeBtn = document.getElementById("prev");

    removeBtn.addEventListener("click", removeImg);

}