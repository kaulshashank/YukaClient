let char = new Image();
char.src = './sprites/Green-Cap-Character-16x18.png';
char.onload = function () {
    init();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// Sprite rows numbers
const DOWN = 0;
const RIGHT = 3;
const UP = 1;
const LEFT = 2;
let currentDirection = 0;

const scale = 2;
const spriteWidth = 16;
const spriteHeight = 18;
const scaledHeight = scale * spriteHeight;
const scaledWidth = scale * spriteWidth;
const boundaryX = canvas.width - scaledWidth;
const boundaryY = canvas.height - scaledHeight;

const cycleLoop = [0, 1, 0, 2]; // Animation cycle (columns of the sprites)
let currentLoopIndex = 0;
let frameCount = 0;

let keypressed = false; // key pressed lock
let lastTime;

let playerX = 0;
let playerY = 0;
let playerMaxSpeed = 200;

const MS = 1000/15;

const debounce = (fn, ms = 0) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(char,
        frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight,
        canvasX, canvasY, scaledWidth, scaledHeight);
    drawBuilding(0, 0, 300, 300);
}

function setDirectionAndStartMoving(event) {
    lastTime = Date.now();
    // console.log(event.keyCode)
    switch (event.keyCode) {
        case 37: startMoving(LEFT); break;
        case 38: startMoving(UP); break;
        case 39: startMoving(RIGHT); break;
        case 40: startMoving(DOWN); break;
    }
}

function stopMoving() {
    window.cancelAnimationFrame(step);
    keypressed = false;
    // currentDirection = DOWN;
    currentLoopIndex = 0;
    lastTime = null;
    frameCount = 0;
    drawFrame(0, currentDirection, playerX, playerY);
}

function startMoving(direction) {
    currentDirection = direction;
    keypressed = true;

    let debounceRAF = debounce(window.requestAnimationFrame, MS)
    debounceRAF(step);
    // window.requestAnimationFrame(step);
}

function updatePlayer(dTime) {
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }

    let movement = dTime * playerMaxSpeed;

    if (playerX >= 0 && playerX < boundaryX) {
        if (currentDirection === LEFT) {
            playerX -= movement;
        } else if (currentDirection === RIGHT) {
            playerX += movement;
        }
    } else {
        if (playerX < 0) {
            playerX = 0;
        } else if (playerX > boundaryX) {
            playerX = boundaryX-1;
        }
    }

    if (playerY >= 0 && playerY <= boundaryY) {
        if (currentDirection === DOWN) {
            playerY += movement;
        } else if (currentDirection === UP) {
            playerY -= movement;
        }
    } else {
        if (playerY < 0) {
            playerY = 0;
        } else if (playerY >= boundaryY) {
            playerY = boundaryY;
        }
    }

    drawFrame(cycleLoop[currentLoopIndex], currentDirection, playerX, playerY);
}


function step() {
    if (keypressed) {

        let currentTime = Date.now();
        let deltaTime = (currentTime - lastTime) / 1000;

        updatePlayer(deltaTime);

        lastTime = currentTime;
        
        let debounceRAF = debounce(window.requestAnimationFrame, MS)
        debounceRAF(step);
        // window.requestAnimationFrame(step);
    } else {
        return;
    }
}

function init() {
    drawFrame(0, currentDirection, playerX, playerY);
    window.addEventListener('keydown', setDirectionAndStartMoving);
    window.addEventListener('keyup', stopMoving)
}



