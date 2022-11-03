const grid = document.querySelector('.grid');
let randomAmount;
let currentPlayerIndex = 350;
let width = 20;
let alienPositions = [];
let currentAlienCount;
let game = true;

for(i = 0; i < 400; i++){
    const square = document.createElement('div');
    grid.appendChild(square);
	alienPositions[i] = i;
}

const squares = Array.from(document.querySelectorAll('.grid div'));

function randomEnemies(){
    randomAmount = Math.floor((Math.random() * 18) + 1);
}

function drawEnemies(){
    for(i = 0; i < randomAmount; i++){
        squares[alienPositions[i]].classList.add('alien');
    }
}

function removeEnemies(){
    for(i = 0; i < randomAmount; i++){
        squares[alienPositions[i]].classList.remove('alien');
    }
}



function draw(){
	if(game == true){
		squares[currentPlayerIndex].classList.add('player');
	}
}

	setInterval(randomEnemies, 40000);
	setInterval(moveAliens, 2000);
	setInterval(draw, 100);    

randomEnemies();
drawEnemies();

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
	if(game == true){
		squares[currentPlayerIndex].classList.remove('player');

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
	
		squares[currentPlayerIndex].classList.add('player');

		if(Keys.space == true){
			shoot();
		}
	
		if(squares[currentPlayerIndex].classList.contains('player') && squares[currentPlayerIndex].classList.contains('alien')){
			console.log('gameover');
			image = document.createElement('img');
			image.setAttribute('src', 'gameover.gif');
			image.setAttribute('width', '500px');
			image.setAttribute('style', 'position: absolute; left: 100px; top: 200px;')
			document.body.appendChild(image);
			game = false;
		}
	}
}
	
function moveAliens(){
	if(game == true){
		console.log('move enmies');	
		removeEnemies();
		for(i = 0; i < randomAmount; i++){
			alienPositions[i] += 20;
		}
		
		drawEnemies();
	}
}

function shoot(e) {
	let laserId;
	let currentLaserIndex = currentPlayerIndex;
	function moveLaser(){
		squares[currentLaserIndex].classList.remove('laser')
		squares[currentLaserIndex] -= width;
	}
}



