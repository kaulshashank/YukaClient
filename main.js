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

const scale = 2;
const spriteWidth = 16;
const spriteHeight = 18;
const scaledHeight = scale * spriteHeight;
const scaledWidth = scale * spriteWidth;

const cycleLoop = [0, 1, 0, 2]; // Animation cycle (columns of the sprites)
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = 0;
let keypressed = false; // key pressed lock

let playerX = 0;
let playerY = 0;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img,
        frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

function setDirectionAndStartMoving(event) {
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
    currentDirection = DOWN;
    currentLoopIndex = 0;
    drawFrame(0, currentDirection, playerX, playerY);
}

function startMoving(direction) {
    currentDirection = direction;
    keypressed = true;
    window.requestAnimationFrame(step);
}

function step() {
    if(keypressed) {
        if(currentDirection === DOWN) {
            playerY = playerY + 5;
        } else if(currentDirection === UP) {
            playerY = playerY - 5;
        } else if(currentDirection === LEFT) {
            playerX = playerX - 5;
        } else if(currentDirection === RIGHT) {
            playerX = playerX + 5;
        }
        drawFrame(cycleLoop[currentLoopIndex], currentDirection, playerX, playerY);
        frameCount++;
        if (frameCount < 15) { 
            // Dont draw the image until 15 frames have rendered (15 fps
            // ... without this it renders at 60fps and it looks stupid)
            window.requestAnimationFrame(step);
            return;
        }
        frameCount = 0;
        
        currentLoopIndex++;
        if (currentLoopIndex >= cycleLoop.length) {
            currentLoopIndex = 0;
        }
        window.requestAnimationFrame(step);        
    }
}

function init() {
    drawFrame(0, currentDirection, playerX, playerY);
    window.addEventListener('keydown', setDirectionAndStartMoving);
    window.addEventListener('keyup', stopMoving)
}

