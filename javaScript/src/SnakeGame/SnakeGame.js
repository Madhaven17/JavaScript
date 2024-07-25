const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;
let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function drawGame() {
    clearScreen();
    changeSnakePosition();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText("Score: " + score, canvas.width - 50, 10);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileSize, headY * tileSize, tileSize, tileSize);
}

function changeSnakePosition() {
    headX += xVelocity;
    headY += yVelocity;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    if (event.keyCode == 38 && yVelocity === 0) {
        if (yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0;
    }

    if (event.keyCode == 40 && yVelocity === 0) {
        if (yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }

    if (event.keyCode == 37 && xVelocity === 0) {
        if (xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
    }
    if (event.keyCode == 39 && xVelocity === 0) {
        if (xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
