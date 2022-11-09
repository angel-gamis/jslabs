const player = document.getElementById('player');

// ** Player Variables **
let playerAlive = true;
let playerY = 250;
let playerMoveStatus = 1;
let playerBoost = 100;
let playerFall = 2;

// ** Game Settings **
let start = true;
setInterval(playerFalling, 450)
setInterval(updatePosition, 15);
setInterval(checkGameStatus, 10);
let runKeyPress = true;

// ** World Settings **
let floor = 525;

document.onkeypress = checkKeycode;
document.onkeyup = checkKeycodeUp;

let Keys = {
    up: false,
    space: false
}
 
function checkKeycode(e){
    let keycode = e.keyCode;
    e.preventDefault();
        if (!runKeyPress) return;
        if (!playerAlive) return;

        if(keycode == 38 || keycode == 87 ){
            runKeyPress = false;
            Keys.up = true; // Up
        }
        if(keycode == 32){
            runKeyPress = false;
            Keys.space = true; // Space
        }

    move();
    
}

function checkKeycodeUp(e){
    let keycode = e.keyCode;
    e.preventDefault();

    if(keycode == 38 || keycode == 87){
        Keys.up = false; // Up
        runKeyPress = true;        
    }
    if(keycode == 32){
        Keys.space = false; // Space
        runKeyPress = true;
    }

    move();
}

function move(){ 

    if(start == true){
        // ** Player Jump **
        if(Keys.up == true){
            playerY -= playerBoost; // Up
            playerMoveStatus = 1;
            player.style.backgroundImage = 'url(birdup1.gif)';
            setTimeout(function(){
                player.style.backgroundImage = 'url(birdrest.gif)'
            },600) 
        }
        if(Keys.space == true){  
            playerY -= playerBoost; // Up
            playerMoveStatus = 1;
            player.style.backgroundImage = 'url(birdup1.gif)';
            setTimeout(function(){
                player.style.backgroundImage = 'url(birdrest.gif)'
                console.log("back to rest")
            },600) 

        }
    }
    player.style.top = playerY + "px";
    //console.log('position: ' + playerY)
}

function updatePosition(){
    if (!playerAlive) return;
    playerY += playerFall;
    player.style.top = playerY + "px";
    //console.log('position: ' + playerY);
    if(playerMoveStatus <= 0){
        player.style.backgroundImage = 'url(birddown1.gif)';
    }
    if(playerY >= floor){
        player.style.backgroundImage = 'url(birddead.gif)';
        playerAlive = false;
    }
}

function playerFalling(){
    playerMoveStatus -= .5;
}

function checkGameStatus(){
    if(playerAlive = false){
        gameover = document.createElement('img');
    }
}