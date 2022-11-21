const player = document.getElementById('player');
const screen = document.getElementById('screen');
const score = document.getElementById('score');
const life1 = document.getElementById('playerLife1');
const life2 = document.getElementById('playerLife2');
const life3 = document.getElementById('playerLife3');

// ** Game Settings **
let game = true;
let scoreCount = 0;
let leftWall = 4;
let rightWall = 556;
let topWall = 4;
let bottomWall = 556;
let bulletSpeed = 1;
let bulletPositionX = [-10,-10,-10,-10,-10,-10,-10,-10];
let bulletPositionY = [-10,-10,-10,-10,-10,-10,-10,-10];
let bulletHit = [false, false, false, false, false, false, false, false]
let bulletAngle = [0,0,0,0,0,0,0,0];
let checkShot = 0;
let vaildShots = 0;
setInterval(moveBullet, .01);

// ** Player Settings ** 
let playerStatus = true;
let playerX = 100;
let playerY = 550;
let playerLives = 3;
let playerSpeed = 12; 
let playerAngle = 0;
let hitWallR = false;
let hitWallL = false;
let hitWallT = false;
let hitWallB = false;

// ** Computer Settings **
let computerX = 500;
let computerY = 100;
let computerMove = 1;
let computerAngle = 0;
let computerHitWall = false;
let computerStatus = true;
let computerSpeed = 40;
moveComputer();

// ** Checks Key Press ** 
document.onkeydown = checkKeycode;
document.onkeyup = checkKeycodeUp;

let Keys = {
	left: false,
	right: false,
	up: false,
	down: false,
	space: false,
	enter: false
}

function checkKeycode(e) {
	let keycode = e.keyCode;
	e.preventDefault();

    if (keycode == 37 || keycode == 65) {
        Keys.left = true; // left
    }
    if (keycode == 39 || keycode == 68) {
        Keys.right = true; // Right
    }
    if (keycode == 38 || keycode == 87) {
        Keys.up = true; // Up
    }
    if (keycode == 40 || keycode == 83) {
        Keys.down = true; // Down
    }
    if (keycode == 32) {
        Keys.space = true; // Space
    }
    if (keycode == 13) {
        Keys.enter = true; // Enter
    }

    
        move();
}

function checkKeycodeUp(e) {
	let keycode = e.keyCode;
	e.preventDefault();

    if (keycode == 37 || keycode == 65) {
        Keys.left = false; // left
    }
    if (keycode == 39 || keycode == 68) {
        Keys.right = false; // Right
    }
    if (keycode == 38 || keycode == 87) {
        Keys.up = false; // Up
    }
    if (keycode == 40 || keycode == 83) {
        Keys.down = false; // Down
    }
    if (keycode == 32) {
        Keys.space = false; // Space
    }
    if (keycode == 12) {
        Keys.enter = false; // Enter
    }

        move()
}

function move() {

    // Change Angle
	if (Keys.left == true && playerStatus == true) {
        playerAngle -= 45;
         if(playerAngle < 0){
            playerAngle = 315
        }
	}
	if (Keys.right == true && playerStatus == true) {
         playerAngle += 45;
         if(playerAngle > 315){
           playerAngle = 0;
         }
     }

     // Move Forward
	if (Keys.up == true) {
        if(playerAngle == 0 && hitWallT == false && playerStatus == true){
            playerY -= playerSpeed;
        }
	    if(playerAngle == 45 && hitWallT == false && hitWallR == false){
            playerY -= playerSpeed;
            playerX += playerSpeed;
        }
        if(playerAngle == 90 && hitWallR == false && playerStatus == true){
            playerX += playerSpeed;
        }
        if(playerAngle == 135 && hitWallR == false && hitWallB == false && playerStatus == true){
            playerY += playerSpeed;
            playerX += playerSpeed;
        }
        if(playerAngle == 180 && hitWallB == false && playerStatus == true){
            playerY += playerSpeed;
        }
        if(playerAngle == 225 && hitWallB == false && hitWallL == false && playerStatus == true){
            playerY += playerSpeed;
            playerX -= playerSpeed;
        }
        if(playerAngle == 270 && hitWallL == false && playerStatus == true){
            playerX -= playerSpeed;
        }
        if(playerAngle == 315 && hitWallL == false && hitWallT == false && playerStatus == true){
            playerY -= playerSpeed;
            playerX -= playerSpeed;
        }
	}

    // Move Backwards
	if (Keys.down == true) {
        if(playerAngle == 0 && hitWallB == false && playerStatus == true){
            playerY += playerSpeed;
        }
		if(playerAngle == 45 && hitWallB == false && hitWallL == false && playerStatus == true){
            playerY += playerSpeed;
            playerX -= playerSpeed;
        }
        if(playerAngle == 90 && hitWallL == false && playerStatus == true){
            playerX -= playerSpeed;
        }
        if(playerAngle == 135 && hitWallL == false && hitWallT == false && playerStatus == true){
            playerY -= playerSpeed;
            playerX -= playerSpeed;
        }
        if(playerAngle == 180 && hitWallT == false && playerStatus == true){
            playerY -= playerSpeed;
        }
        if(playerAngle == 225 && hitWallT == false && hitWallR == false && playerStatus == true){
            playerY -= playerSpeed;
            playerX += playerSpeed;
        }
        if(playerAngle == 270 && hitWallR == false && playerStatus == true){
            playerX += playerSpeed;
        }
        if(playerAngle == 315 && hitWallR && hitWallB == false && playerStatus == true){
            playerY += playerSpeed;
            playerX += playerSpeed;
        }
	}

    player.style = "position: absolute; left: " + playerX + "px; top: " + playerY + "px; transform: rotate("+playerAngle+"deg)";


    // Check Collision Walls

    if(playerX >= rightWall){
        hitWallR = true;
    }
    else{
        hitWallR = false;
    }

    if(playerX <= leftWall){
        hitWallL = true;
    }
    else{
        hitWallL = false;
    }

    if(playerY <= topWall){
        hitWallT = true;
    }
    else{
        hitWallT = false;
    }

    if(playerY >= bottomWall){
        hitWallB = true;
    }
    else{
        hitWallB = false;
    }

    // Shoot
    if(Keys.space == true  && playerStatus == true){
        shoot();
    }

    // -- End of move() --
}

function moveComputer(){

    if(computerStatus == true){
        // X
        if(playerX > computerX){
            computerX += computerMove;
        }
        else if(playerX < computerX){
            computerX -= computerMove;
        }

        // Y
        if(playerY > computerY){
            computerY += computerMove;
        }
        else if(playerY < computerY){
            computerY -= computerMove;
        }
    }

    computer.style = "position: absolute; left: " + computerX + "px; top: " + computerY + "px;"

    // ** Player Collision **

    // X Axis of Player
    if(computerX >= playerX - 40 && computerX <= playerX + 40 && computerY >= playerY - 20 && computerY <= playerY + 20){
        playerLives--;
        player.src = "died.png";
        playerStatus = false;
        computerStatus = false;
        setTimeout(function(){
            playerX = 500;
            playerY = 500;
            player.style = "position: absolute; left: " + playerX + "px; top: " + playerY + "px; transform: rotate("+playerAngle+"deg)";
            player.src = "redtank.gif";
            playerStatus = true;
            computerStatus = true;
        }, 300)
    }
    // Y Axis of Player
    if(computerY >= playerY - 40 && computerY <= playerY + 40 && computerX >= playerX - 20 && computerX <= playerX + 20){
        playerLives--;
        player.src = "died.png";
        playerStatus = false;
        computerStatus = false;
        setTimeout(function(){
            playerX = 500;
            playerY = 500;
            player.style = "position: absolute; left: " + playerX + "px; top: " + playerY + "px; transform: rotate("+playerAngle+"deg)";
            player.src = "redtank.gif";
            playerStatus = true;
            computerStatus = true;
        }, 300)
    }

    if(playerLives == 2){
        life3.src = "";
    }
    if(playerLives == 1){
        life2.src = "";
    }
    if(playerLives == 0){
        gameOver();
    }

    setTimeout(moveComputer, computerSpeed);
    // -- End of moveComputer()
}

function shoot(){
    console.log('shoot')
    console.log('first: ' + vaildShots);
    console.log('checkShot: ' + checkShot);
    vaildShots = 0;

    while(vaildShots == 0){
        checkShot++;
        if(bulletHit[checkShot - 1] == true){
            bulletHit[(checkShot - 1)] = false;
        }
        if(bulletPositionX[checkShot] <= -10){
            bulletAngle[checkShot] = playerAngle;
            bulletPositionX[checkShot] = playerX;
            bulletPositionY[checkShot] = playerY;

            // Center Bullet
            if(playerAngle == 315){
                // Default
            }
            if(playerAngle == 0){
                bulletPositionX[checkShot] = playerX + 14;
                bulletPositionY[checkShot] = playerY - 6;
            }
            if(playerAngle == 45){
                bulletPositionX[checkShot] = playerX + 29;
                bulletPositionY[checkShot] = playerY - 1;
            }
            if(playerAngle == 90){
                bulletPositionX[checkShot] = playerX + 37;
                bulletPositionY[checkShot] = playerY + 15;
            }
            if(playerAngle == 135){
                bulletPositionX[checkShot] = playerX + 31;
                bulletPositionY[checkShot] = playerY + 30;
            }
            if(playerAngle == 180){
                bulletPositionX[checkShot] = playerX + 16;
                bulletPositionY[checkShot] = playerY + 36
            }
            if(playerAngle == 225){
                bulletPositionX[checkShot] = playerX - 1;
                bulletPositionY[checkShot] = playerY + 29;
            }
            if(playerAngle == 270){
                bulletPositionX[checkShot] = playerX - 6;
                bulletPositionY[checkShot] = playerY + 15;
            }

            vaildShots = 1;
        }
        if(checkShot == 5){
            vaildShots = 1;
            checkShot = 0;
        }
    }

    console.log(bulletHit);
    // --End of Shoot()--
}

function moveBullet(){

    for(bullet=1;bullet<=7;bullet++){
        if(bulletPositionX[bullet] > -10 && bulletHit[bullet] == false){
            if(bulletAngle[bullet] == 0 || bulletAngle[bullet] == 45 || bulletAngle[bullet] == 315){
                bulletPositionY[bullet] -= bulletSpeed;
            }
            if(bulletAngle[bullet] == 45 || bulletAngle[bullet] == 90 || bulletAngle[bullet] == 135){
                bulletPositionX[bullet] += bulletSpeed;
            }
            if(bulletAngle[bullet] == 135 || bulletAngle[bullet] == 180 || bulletAngle[bullet] == 225){
                bulletPositionY[bullet] += bulletSpeed;
            }
            if(bulletAngle[bullet] == 225 || bulletAngle[bullet] == 270 || bulletAngle[bullet] == 315){
                bulletPositionX[bullet] -= bulletSpeed;
            }

            // Checks if bullet leaves screen
            if(bulletPositionX[bullet] < 0 || bulletPositionY[bullet] < 0 || bulletPositionX[bullet] > 600 || bulletPositionY[bullet] > 600){
                bulletPositionX[bullet] = -10;
            }

            // ** Check Collision **

            // Right of Comp
            if(computerX + 20 == bulletPositionX[bullet] - 5 && bulletPositionY[bullet] >= (computerY - 20) && bulletPositionY[bullet] <= (computerY + 20)){
                computerStatus = false;
                bulletHit[bullet] = true;
                bulletPositionX[bullet] = -10;
                computer.src = "died.png";
                scoreCount++;
                score.innerHTML = "Score:   " + scoreCount;
                setTimeout(function(){
                    computerY = 100;
                    computerX = 100;
                    computer.src = "greytank.gif";
                    computerStatus = true;
                    computerSpeed--;
                    console.log(computerSpeed);
                }, 300)
            }
            // Left of Comp
            if(computerX == bulletPositionX[bullet] + 5 && bulletPositionY[bullet] >= (computerY - 20) && bulletPositionY[bullet] <= (computerY + 20)){
                computerStatus = false;
                bulletHit[bullet] = true;
                bulletPositionX[bullet] = -10;
                computer.src = "died.png";
                scoreCount++;
                score.innerHTML = "Score:   " + scoreCount;
                setTimeout(function(){
                    computerY = 100;
                    computerX = 100;
                    computer.src = "greytank.gif";
                    computerStatus = true;
                    computerSpeed--;
                    console.log(computerSpeed);
                }, 300)
            }
            // Bottom of Comp
            if(computerY + 20 == bulletPositionY[bullet] - 5 && bulletPositionX[bullet] >= (computerX - 20) && bulletPositionX[bullet] <= (computerX + 20)){
                computerStatus = false;
                bulletHit[bullet] = true;
                bulletPositionX[bullet] = -10;
                computer.src = "died.png";
                scoreCount++;
                score.innerHTML = "Score:   " + scoreCount;
                setTimeout(function(){
                    computerY = 100;
                    computerX = 100;
                    computer.src = "greytank.gif";
                    computerStatus = true;
                    computerSpeed--;
                    console.log(computerSpeed);
                }, 300)
            }
            // Top of Comp
            if(computerY - 25 == bulletPositionY[bullet] + 5 && bulletPositionX[bullet] >= (computerY - 20) && bulletPositionX[bullet] <= (computerY + 20)){
                computerStatus = false;
                bulletHit[bullet] = true;
                bulletPositionX[bullet] = -10;
                computer.src = "died.png";
                scoreCount++;
                score.innerHTML = "Score:   " + scoreCount;
                setTimeout(function(){
                    computerY = 100;
                    computerX = 100;
                    computer.src = "greytank.gif";
                    computerStatus = true;
                    computerSpeed--;
                    console.log(computerSpeed);
                }, 300)
            }

            // --Check Collision--

            // Displays bullet
            document.getElementById("shot"+bullet).style = 'position: absolute; left: ' + bulletPositionX[bullet] + 'px; top: ' + bulletPositionY[bullet] + 'px;';
        }
        // --End of For Loop--
    }

}

function gameOver(){
    // death sequence
    playerStatus = false;
    computerStatus = false;
    gameOverTitle = document.createElement('img');
    gameOverTitle.src = 'gameover.gif';
    gameOverTitle.width = 400;
    gameOverTitle.classList = 'gameover'
    screen.appendChild(gameOverTitle);
}

function restart(){
    // restart Sequence
    game = true;
    playerLives = 3;
    scoreCount = 0;
    score.innerHTML = "Score:   " + scoreCount;

}
