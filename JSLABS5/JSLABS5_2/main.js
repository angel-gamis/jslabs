const player = document.getElementById('player');
const grass = document.getElementById('grass');
const newGrass = document.getElementById('newGrass');
const screen = document.getElementById('screen');
const pipeTop = document.getElementById('pipeTop');
const pipeBottom = document.getElementById('pipeBottom');
const pipeExtra = document.getElementById('pipeExtra');
const hole = document.getElementById('hole');
const div = document.getElementById('div');

// ** Player Variables **
let playerAlive = true;
let playerY = 250;
let playerX = 125;
let playerMoveStatus = 1;
let playerBoost = 100;
let playerFall = 3.75;
let flapCount = 0;

// ** Game Settings **
let start = false;
setInterval(playerFalling, 450);
setInterval(updatePosition, 15);
setInterval(checkGameStatus, 10);
setInterval(animateFlap, 125);
let runKeyPress = true;

pipeTop.addEventListener('animationiteration', () => {
    let randomBottom = Math.floor(298*Math.random())+217;
    pipeBottom.style = "position: absolute; top: " + randomBottom + "px; left: 396px;";
    pipeTop.style = "position: absolute; top: " + (randomBottom - 377) + "px; left: 396px;";
    pipeExtra.style = "position: absolute; top: -500px; left: 399px;";
    hole.style = "position: absolute; top:" + (randomBottom - 180) + "px; left: 396px;";
    if(randomBottom <= 362){
       pipeExtra.style = "position: absolute; top: 405px; left: 399px";
    }
    if((randomBottom - 377) >= 0){
        pipeExtra.style = "position: absolute; top: 0px; left: 399px";
    }
    // bottom 515px max 217 min (363 &< needs Extra)
    // top -150px min max 148px (-1 &> needs Extra)
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
    player.classList = "start flap";
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
        pipeExtra.classList = "animate";
        runKeyPress = false;
        Keys.up = true; // Up
    }
    if (keycode == 32) {
        start = true;
        player.classList = "";
        pipeTop.classList = "animate";
        pipeBottom.classList = "animate";
        pipeExtra.classList = "animateExtra";
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
            //player.style.backgroundImage = 'url(birdup1.gif)';
            setTimeout(function () {
                //player.style.backgroundImage = 'url(birdrest.gif)'
            }, 700)
        }
    }
    player.style.top = playerY + "px";
}

function updatePosition() {
    if (!playerAlive) return;
    if(!start) return;
    playerY += playerFall;
    player.style.top = playerY + "px";
    if (playerMoveStatus <= 0) {
        //player.style.backgroundImage = 'url(birddown1.gif)';
    }
    if (playerY >= floor) {
        //player.style.backgroundImage = 'url(birddead.gif)';
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

    let pipeX = parseInt(window.getComputedStyle(pipeBottom).getPropertyValue('left'));
    let pipeTopY = parseInt(window.getComputedStyle(pipeTop).getPropertyValue('top'));
    let pipeBottomY = parseInt(window.getComputedStyle(pipeBottom).getPropertyValue('top'));

    // ** Collision Detection **
    if(playerX + 15 > pipeX && playerY < (pipeTopY + 195))
    {
        playerAlive = false;
    }
    if(playerX + 15 > pipeX && playerY > (pipeBottomY)){
        playerAlive = false;
    }

    grass.style = "position: absolute; left: " + grassX + "px; top: 558px;";
    newGrass.style = "position: absolute; left: " + newGrassX + "px; top: 558px;";
}

function playerFalling() {
    playerMoveStatus -= .5;
}

function animateFlap(){
    flapCount++
    console.log("flap")
    if(flapCount == 4){
        flapCount = 1;
    }

    switch(flapCount){
        case 1:
            player.src = "upflap.png";
            break;
        case 2: 
            player.src = "midflap.png";
            break;
        case 3:
            player.src = "downflap.png";

    }
}

function checkGameStatus() {
    if (playerAlive == false) {
        gameover = document.createElement('img');
        gameover.src = 
        pipeBottom.classList = "";
        pipeTop.classList = "";
        pipeExtra.classList = "";
    }
}