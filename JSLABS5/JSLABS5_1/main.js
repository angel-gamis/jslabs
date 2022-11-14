const player = document.getElementById('player');
const screen = document.getElementById('screen');

// ** Player Settings ** 
let playerX = 100;
let playerY = 100;
let playerSpeed = 12;
let playerAngle = 0;

// ** Computer Settings **
let computerX = 200;
let computerY = 200;
let computerSpeed = 15;
let computerAngle = 0;
setInterval(moveComputer, 400);

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

	move();
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
            if(playerAngle == 0){
                playerY -= playerSpeed;
            }
			if(playerAngle == 45){
                playerY -= playerSpeed;
                playerX += playerSpeed;
            }
            if(playerAngle == 90){
                playerX += playerSpeed;
            }
            if(playerAngle == 135){
                playerY += playerSpeed;
                playerX += playerSpeed;
            }
            if(playerAngle == 180){
                playerY += playerSpeed;
            }
            if(playerAngle == 225){
                playerY += playerSpeed;
                playerX -= playerSpeed;
            }
            if(playerAngle == 270){
                playerX -= playerSpeed;
            }
            if(playerAngle == 315){
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
