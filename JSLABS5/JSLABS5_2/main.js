const player = document.getElementById('player');

// ** Player Variables **
let playerY = 250;
let playerMoveStatus = 0;
let playerBoost = 50;
let playerFall = 20;



document.onkeydown = checkKeycode;
document.onkeyup = checkKeycodeUp;

let Keys = {
    up: false,
    space: false
}

function checkKeycode(e){
    let keycode = e.keyCode;
    e.preventDefault();

    if(keycode == 38 || keycode == 87){
        Keys.up = true; // Up
    }
    if(keycode == 32){
        Keys.space = true; // Space
    }

    move();
    
}

function checkKeycodeUp(e){
    let keycode = e.keyCode;
    e.preventDefault();

    if(keycode == 38 || keycode == 87){
        Keys.up = false; // Up
    }
    if(keycode == 32){
        Keys.space = false; // Space
    }

    move();
}

function move(){

    if(start == true){
        // ** Player Jump **
        if(Keys.up == true){
            player.; // Up
        }
        if(Keys.space == true){

        }
    }

}
