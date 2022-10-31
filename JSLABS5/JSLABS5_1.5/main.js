const grid = document.querySelector('.grid');
let randomAmount;
let currentPlayerIndex = 350;
let width = 20;

for(i = 0; i < 400; i++){
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

let alienPositions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

setInterval(drawEnemies, 5000);

function randomEnemies(){
    randomAmount = Math.floor((Math.random() * 18) + 1);
}

function drawEnemies(){
    console.log('drawn');
    randomEnemies();
    for(i = 0; i < randomAmount; i++){
        squares[i].classList.add('alien');
    }
    squares[currentPlayerIndex].classList.add('player');
}

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

function checkKeycode(e){
	let keycode = e.keyCode;
	e.preventDefault();

	if(keycode == 37 || keycode == 65){
		Keys.left = true; // left
	}
	if(keycode == 39 || keycode == 68){
		Keys.right = true; // Right
	}
	if(keycode == 38 || keycode == 87){
		Keys.up = true; // Up
	}
    if(keycode == 40 || keycode == 83){
		Keys.down = true; // Down
	}
	if(keycode == 32){
		Keys.space = true; // Space
	}
	if(keycode == 13){
		Keys.enter = true; // Enter
	}

	move();
				
}

function checkKeycodeUp(e){
	let keycode = e.keyCode;
	e.preventDefault();

	if(keycode == 37 || keycode == 65){
		Keys.left = false; // left
	}
	if(keycode == 39 || keycode == 68){
		Keys.right = false; // Right
	}
	if(keycode == 38 || keycode == 87){
		Keys.up = false; // Up
	}
	if(keycode == 40 || keycode == 83){
		Keys.down = false; // Down
	}
	if(keycode == 32){
		Keys.space = false; // Space
	}
	if(keycode == 12){
		Keys.enter = false; // Enter
	}

	move();
}

function move(){
    squares[currentPlayerIndex].classList.remove('player');

    //if(start == true){
        // ** Player Movement **

        if(Keys.left == true && currentPlayerIndex % width != 0){
            currentPlayerIndex -= 1; // Left
        }
        if(Keys.right == true && currentPlayerIndex % width < width - 1){
            currentPlayerIndex += 1; // Right
        }
        if(Keys.up == true && currentPlayerIndex > 20){
            currentPlayerIndex -= 20; // Up
        }
        if(Keys.down == true &&  currentPlayerIndex < 380){
            currentPlayerIndex += 20; // Down
        }
    //}

    squares[currentPlayerIndex].classList.add('player');
}