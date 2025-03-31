var block = 35;
var cols = 17;
var rows = 15;
var game;
var context;

var players = 1;
var len = 2;
var headX = block * 2;
var headY = Math.round(cols * block / 2);
var body;
var dx;
var dy;
var speed;
var moves;
var lastX;
var lastY;

var foodX;
var foodY;

var score;
var highScore;
var gameLoop;

var eatSound;
var deathSound;

window.onload = function () {
    // Set game size
    game = document.getElementById("game");
    game.height = rows * block;
    game.width = cols * block;
    context = game.getContext("2d");
    
    highScore = 0;
    document.getElementById("high").innerText = "High Score: " + highScore;
    document.addEventListener("keydown", keyPressed);

    eatSound = new sound("audio/take.mp3");
    deathSound = new sound("audio/bonk.mp3");

    init();
}

function init() {
    clearInterval(gameLoop);

    block = 35;
    cols = 17;
    rows = 15;

    players = 1;
    len = 2;
    headX = block * 2;
    headY = Math.round(rows / 2) * block - block;
    body = [];
    dx = 0;
    dy = 0;
    speed = 5;
    moves = []
    lastX = headX;
    lastY = headY;

    foodX = headX + 8 * block;
    foodY = headY;

    score = 0;

    for (let i = 0; i < 15; i++) {
        body.push([headX - speed, headY]);
    }

    update();
    gameLoop = setInterval(update, 16);
}

function update() {
    document.getElementById("msg").innerText = "Score: " + score;

    // change direction
    if (moves.length > 0 && headX % block == 0 && headY % block == 0) {
        switch (moves.shift()) {
            case "up":
                dx = 0;
                dy = -1;
                break;
            case "down":
                dx = 0;
                dy = 1;
                break;
            case "left":
                dx = -1;
                dy = 0;
                break;
            case "right":
                dx = 1;
                dy = 0;
                break;
        }
    }

    // checkered background
    context.fillStyle = "#AAD751";
    context.fillRect(0, 0, game.width, game.height);
    context.fillStyle = "#A2D149";
    let initY = 0;
    for (let i = 0; i <= game.width; i += block) {
        initY = initY == 0 ? block : 0;
        for (let j = initY; j <= game.height; j += 2 * block) {
            context.fillRect(i, j, block, block);
        }
    }

    // draw food
    context.fillStyle = "#FFFF00";
    context.fillRect(foodX, foodY, block, block);

    // draw and move snake
    headX += dx * speed;
    headY += dy * speed;

    context.fillStyle = "#FF0000";
    for (let i = body.length - 1; i >= 0; i--) {
        context.fillRect(body[i][0], body[i][1], block, block);
        if (dx != 0 || dy != 0) {
            if (i == 0) body[i] = [headX, headY];
            else body[i] = [body[i - 1][0], body[i - 1][1]];
        }
    }
    lastX = headX;
    lastY = headY;

    context.fillRect(headX, headY, block, block);

    // collisions
    if (headX == foodX && headY == foodY) {
        score++;
        foodX = Math.floor(Math.random() * (cols - 1)) * block
        foodY = Math.floor(Math.random() * (rows - 1)) * block
        for (let i = 0; i < 7; i++) {
            body.push([body[body.length - 1][0], body[body.length - 1][1]]);
        }
        eatSound.play();
    }

    if (headX < 0 || headY < 0 || headX > game.width - block || headY > game.height - block ) {
        gameOver();
    }

    for (let i = 7; i < body.length; i++) {
        if (headX == body[i][0] && headY == body[i][1]) {
            gameOver();
        }
    }
}

function keyPressed(e) {
    // prevent scrolling
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
    }

    if (dx == 0 && dy == 0) moves.push("right");
    else if (e.code == "ArrowUp" && (moves.length == 0 || moves[0] != "down") && dy != 1) { 
        moves.push("up");
    } else if (e.code == "ArrowDown" && (moves.length == 0 || moves[0] != "up") && dy != -1) {
        moves.push("down");
    } else if (e.code == "ArrowLeft" && (moves.length == 0 || moves[0] != "right") && dx != 1) {
        moves.push("left");
    } else if (e.code == "ArrowRight" && (moves.length == 0 || moves[0] != "left") && dx != -1) { 
        moves.push("right");
    }

}

function gameOver() {
    clearInterval(gameLoop);
    context.fillStyle = "#000000";
    context.font = "50px Arial";
    context.fillText("Game Over", game.width / 2 - 3.5 * block, game.height / 2);
    deathSound.play();

    if (score > highScore) {
        highScore = score;
        document.getElementById("high").innerText = "High Score: " + highScore;
    }
}

// ripped from w3 lol
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
      this.sound.play();
    }
    this.stop = function() {
      this.sound.pause();
    }
}