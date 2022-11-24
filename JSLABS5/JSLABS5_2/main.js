const player = document.getElementById('player');
const grass = document.getElementById('grass');
const newGrass = document.getElementById('newGrass');
const screen = document.getElementById('screen');
const pipeTop = document.getElementById('pipeTop');
const pipeBottom = document.getElementById('pipeBottom');
const hole = document.getElementById('hole');

// ** Player Variables **
let playerAlive = true;
let playerY = 250;
let playerMoveStatus = 1;
let playerBoost = 100;
let playerFall = 3.75;

// ** Game Settings **
let start = false;
setInterval(playerFalling, 450);
setInterval(updatePosition, 15);
setInterval(checkGameStatus, 10);
let runKeyPress = true;

pipeTop.addEventListener('animationiteration', () => {
    let randomBottom = Math.floor(298*Math.random())+217;
    pipeBottom.style = "position: absolute; top: " + randomBottom + "px; left: 396px;";
    pipeTop.style = "position: absolute; top: " + (randomBottom - 377) + "px; left: 396px;";
    //bottom 515px max 217 min
    // top -150px min max 148px 
})

// ** World Settings **
let floor = 525;
let grassX = 2;
let newGrassX = 478;
let grassSpeed = 3;
let grassDeleteX = -480;

document.onkeypress = checkKeycode;
document.onkeyup = checkKeycodeUp;

document.body.onload = function(){
    player.classList = "start";
}

let Keys = {
    up: false,
    click: false,
}

function checkKeycode(e) {
    let keycode = e.keyCode;
    e.preventDefault();
    if (!runKeyPress) return;
    if (!playerAlive) return;

    if (keycode == 38 || keycode == 87) {
        start = true;
        player.classList = "";
        pipeTop.classList = "animate";
        pipeBottom.classList = "animate";
        runKeyPress = false;
        Keys.up = true; // Up
    }
    if (keycode == 32) {
        start = true;
        player.classList = "";
        pipeTop.classList = "animate";
        pipeBottom.classList = "animate";
        runKeyPress = false;
        Keys.up = true; // Space
    }

    move();

}

function checkKeycodeUp(e) {
    let keycode = e.keyCode;
    e.preventDefault();

    if (keycode == 38 || keycode == 87) {
        Keys.up = false; // Up
        runKeyPress = true;
    }
    if (keycode == 32) {
        Keys.up = false; // Space
        runKeyPress = true;
    }

    move();
}

function move() {

    if (start == true && playerY > -50) {
        // ** Player Jump **
        if (Keys.up == true) {
            playerY -= playerBoost; // Up
            playerMoveStatus = 1;
            player.style.backgroundImage = 'url(birdup1.gif)';
            setTimeout(function () {
                player.style.backgroundImage = 'url(birdrest.gif)'
            }, 600)
        }
    }
    player.style.top = playerY + "px";
    //console.log('position: ' + playerY)
}

function updatePosition() {
    if (!playerAlive) return;
    if(!start) return;
    playerY += playerFall;
    player.style.top = playerY + "px";
    if (playerMoveStatus <= 0) {
        player.style.backgroundImage = 'url(birddown1.gif)';
    }
    if (playerY >= floor) {
        player.style.backgroundImage = 'url(birddead.gif)';
        playerAlive = false;
    }

    // Move grass to beginning
    if (newGrassX <= -478) {
        newGrassX = 478;
    }
    if (grassX <= -478) {
        grassX = 478;
    }

    newGrassX -= grassSpeed;
    grassX -= grassSpeed;
    grass.style = "position: absolute; left: " + grassX + "px; top: 558px;";
    newGrass.style = "position: absolute; left: " + newGrassX + "px; top: 558px;";
}

function playerFalling() {
    playerMoveStatus -= .5;
}

function checkGameStatus() {
    if (playerAlive == false) {
        gameover = document.createElement('img');
        pipeBottom.classList = "";
        pipeTop.classList = "";
    }
}