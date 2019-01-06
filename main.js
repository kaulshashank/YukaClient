let img = new Image();
img.src = './sprites/Green-Cap-Character-16x18.png';
img.onload = function () {
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

const cycleLoop = [0, 1, 0, 2]; // Animation cycle (columns of the sprites)
let currentLoopIndex = 0;
let frameCount = 0;

let keypressed = false; // key pressed lock
let lastTime;

let playerX = 0;
let playerY = 0;
let playerMaxSpeed = 900;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img,
        frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight,
        canvasX, canvasY, scaledWidth, scaledHeight);
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
    window.requestAnimationFrame(step);
}

function updatePlayer(dTime) {
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }

    if (currentDirection === DOWN) {
        playerY += dTime * playerMaxSpeed;
    } else if (currentDirection === UP) {
        playerY -= dTime * playerMaxSpeed;
    } else if (currentDirection === LEFT) {
        playerX -= dTime * playerMaxSpeed;
    } else if (currentDirection === RIGHT) {
        playerX += dTime * playerMaxSpeed;
    }

    drawFrame(cycleLoop[currentLoopIndex], currentDirection, playerX, playerY);
}


function step() {
    if (keypressed) {

        frameCount++;
        if (frameCount < 4) {
            // Limit frames.
            return;
        }
        frameCount = 0;

        let currentTime = Date.now();
        let deltaTime = (currentTime - lastTime) / 1000;

        updatePlayer(deltaTime);

        lastTime = currentTime;
        window.requestAnimationFrame(step);
    }
}

function init() {
    drawFrame(0, currentDirection, playerX, playerY);
    window.addEventListener('keydown', setDirectionAndStartMoving);
    window.addEventListener('keyup', stopMoving)
}

