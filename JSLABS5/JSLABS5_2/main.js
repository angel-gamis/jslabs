const player = document.getElementById('player');

// ** Player Variables **
let playerY = 250;
let playerMoveStatus = 0;
let playerBoost = 100;
let playerFall = 2;

// ** Game Settings **
let start = true;
setInterval(updatePosition, 15);


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
            playerY -= playerBoost; // Up
            player.style.backgroundimage = 'url(birdup1.gif)';
            setTimeout(function(){
                player.style.backgroundimage = 'url(birdrest.gif)'
            },1000) 
        }
        if(Keys.space == true){
            playerY -= playerBoost; // Up
            playerMoveStatus = 1;
            player.style.backgroundimage = 'url(birdup1.gif)';
            setTimeout(function(){
                player.style.backgroundimage = 'url(birdrest.gif)'
                console.log("back to rest")
            },2000) 

        }
    }
    player.style.top = playerY + "px";
    console.log('position: ' + playerY)
}

function updatePosition(){
    playerY += playerFall;
    player.style.top = playerY + "px";
}