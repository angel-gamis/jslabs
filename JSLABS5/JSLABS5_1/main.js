const player = document.getElementById('player');
const screen = document.getElementById('screen');

// ** Game Settings **
let leftWall = 4;
let rightWall = 556;
let topWall = 4;
let bottomWall = 556;
let bulletSpeed = 20;

// ** Player Settings ** 
let playerX = 100;
let playerY = 100;
let playerSpeed = 12;
let playerAngle = 0;
let hitWallR = false;
let hitWallL = false;
let hitWallT = false;
let hitWallB = false;


// ** Computer Settings **
let computerX = 200;
let computerY = 200;
let computerSpeed = 15;
let computerAngle = 0;
let computerHitWall = false;
setInterval(moveComputer, 500);

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
	if (Keys.left == true) {
        playerAngle -= 45;
         if(playerAngle < 0){
            playerAngle = 315
        }
	}
	if (Keys.right == true) {
         playerAngle += 45;
         if(playerAngle > 315){
           playerAngle = 0;
         }
     }

     // Move Forward
	if (Keys.up == true) {
        if(playerAngle == 0 && hitWallT == false){
            playerY -= playerSpeed;
        }
	    if(playerAngle == 45 && hitWallT == false && hitWallR == false){
            playerY -= playerSpeed;
            playerX += playerSpeed;
        }
        if(playerAngle == 90 && hitWallR == false){
            playerX += playerSpeed;
        }
        if(playerAngle == 135 && hitWallR == false && hitWallB == false){
            playerY += playerSpeed;
            playerX += playerSpeed;
        }
        if(playerAngle == 180 && hitWallB == false){
            playerY += playerSpeed;
        }
        if(playerAngle == 225 && hitWallB == false && hitWallL == false){
            playerY += playerSpeed;
            playerX -= playerSpeed;
        }
        if(playerAngle == 270 && hitWallL == false){
            playerX -= playerSpeed;
        }
        if(playerAngle == 315 && hitWallL == false && hitWallT == false){
            playerY -= playerSpeed;
            playerX -= playerSpeed;
        }
	}

        // Move Backwards
		if (Keys.down == true) {
            if(playerAngle == 0){
                playerY += playerSpeed;
            }
			if(playerAngle == 45){
                playerY += playerSpeed;
                playerX -= playerSpeed;
            }
            if(playerAngle == 90){
                playerX -= playerSpeed;
            }
            if(playerAngle == 135){
                playerY -= playerSpeed;
                playerX -= playerSpeed;
            }
            if(playerAngle == 180){
                playerY -= playerSpeed;
            }
            if(playerAngle == 225){
                playerY -= playerSpeed;
                playerX += playerSpeed;
            }
            if(playerAngle == 270){
                playerX += playerSpeed;
            }
            if(playerAngle == 315){
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
        if(Keys.space == true){
            shoot();
        }
}

function moveComputer(){

    // X
    if(playerX > computerX){
        computerX += computerSpeed;
    }
    else if(playerX < computerX){
        computerX -= computerSpeed;
    }

    // Y
    if(playerY > computerY){
        computerY += computerSpeed;
    }
    else if(playerY < computerY){
        computerY -= computerSpeed;
    }

    computer.style = "position: absolute; left: " + computerX + "px; top: " + computerY + "px;"

}

function shoot(){
    console.log('shoot')
    let bullet = document.createElement('img');
    bullet.src = 'shot.gif';
    bullet.width = 10;
    bullet.height = 10;
    bullet.id = 'bullet'
    screen.appendChild(bullet);

    moveBullet();
}
function moveBullet(){
    // Move Bullet Till Collision;
    if(playerAngle == 315){
        document.getElementById('bullet').style = 'position: absolute; left: ' + playerX + 'px; top: ' + playerY + 'px;';
    }
    if(playerAngle == 0){
        document.getElementById('bullet').style = 'position: absolute; left: ' + (playerX + 14) + 'px; top: ' + (playerY - 6) + 'px;';
    }
    if(playerAngle == 45){
        document.getElementById('bullet').style = 'position: absolute; left: ' + (playerX + 29) + 'px; top: ' + (playerY - 1) + 'px;';
    }
    if(playerAngle == 90){
        document.getElementById('bullet').style = 'position: absolute; left: ' + (playerX + 37) + 'px; top: ' + (playerY + 15) + 'px;';
    }
    if(playerAngle == 135){
        document.getElementById('bullet').style = 'position: absolute; left: ' + (playerX + 31) + 'px; top: ' + (playerY + 30) + 'px;';
    }
    if(playerAngle == 180){
        document.getElementById('bullet').style = 'position: absolute; left: ' + (playerX + 16) + 'px; top: ' + (playerY + 36) + 'px;';
    }
    if(playerAngle == 225){
        document.getElementById('bullet').style = 'position: absolute; left: ' + (playerX) + 'px; top: ' + (playerY + 29) + 'px;';
    }
    if(playerAngle == 270){
        document.getElementById('bullet').style = 'position: absolute; left: ' + (playerX - 6) + 'px; top: ' + (playerY + 15) + 'px;';
    }
}
