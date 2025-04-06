import { Snake } from './snake.js';

var block = 35;
var cols = 17;
var rows = 15;
var game;
var context;

var players = 1;
var len = 2;

// remove l8tr
var headX = block * 2;
var headY = Math.round(cols * block / 2);
var dx;
var dy;
var moves;
var body;
var speed;

var foodX;
var foodY;

var score;
var highScore;
var gameLoop;

var eatSound;
var deathSound;
var images;

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

    // load images and init
    let loadedImgs = 0;
    images = {
        headImage: new Image(),
        deadImage: new Image(),
        foodImage: new Image()
    }
    images.headImage.src = "sprites/head.png";
    images.deadImage.src = "sprites/dead.png";
    images.foodImage.src = "sprites/apple.png";

    for (let key in images) {
        images[key].onload = function () {
            loadedImgs++;
            if (loadedImgs >= 3) {
                init();
            }
        }
    }
}

function init() {
    clearInterval(gameLoop);

    block = 35;
    cols = 17;
    rows = 15;

    players = 1;
    len = 2;
    speed = 5;

    // TODO del vars later
    let snake1 = new Snake(block * 2, Math.round(rows / 2) * block - block, 1);
    for (let i = 0; i < 15; i++) {
        snake1.body.push([headX - speed, headY]);
    }

    foodX = headX + 8 * block;
    foodY = headY;

    score = 0;

    update();
    gameLoop = setInterval(update, 16);
}

function update() {
    document.getElementById("msg").innerText = "Score: " + score;

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
    context.drawImage(images.foodImage, foodX, foodY);

    // draw and move snakes
    snake1.update(context, images);

    // collisions
    if (snake1.headX == foodX && snake1.headY == foodY) {
        score++;
        foodX = Math.floor(Math.random() * (cols - 1)) * block
        foodY = Math.floor(Math.random() * (rows - 1)) * block
        for (let i = 0; i < 7; i++) {
            snake1.body.push([snake1.body[snake1.body.length - 1][0], snake1.body[snake1.body.length - 1][1]]);
        }
        eatSound.play();
    }

    if (snake1.headX < 0 || snake1.headY < 0 || snake1.headX > game.width - block || snake1.headY > game.height - block ) {
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

    if (snake1.dx == 0 && snake1.dy == 0) { 
        snake1.moves.push("right") 
    };

    // snake1
    if ((e.code == "KeyW") && (snake1.moves.length == 0 || snake1.moves[0] != "down") && snake1.dy != 1) {
        snake1.moves.push("up");
    } else if ((e.code == "KeyS") && (snake1.moves.length == 0 || snake1.moves[0] != "up") && snake1.dy != -1) {
        snake1.moves.push("down");
    } else if ((e.code == "KeyA") && (snake1.moves.length == 0 || snake1.moves[0] != "right") && snake1.dx != 1) {
        snake1.moves.push("left");
    } else if ((e.code == "KeyD") && (snake1.moves.length == 0 || snake1.moves[0] != "left") && snake1.dx != -1) {
        snake1.moves.push("right");
    }

    // snake2
    // if ((e.code == "ArrowUp") && (snake2.moves.length == 0 || snake2.moves[0] != "down") && snake2.dy != 1) {
    //     snake2.moves.push("up");
    // } else if ((e.code == "ArrowDown") && (snake2.moves.length == 0 || snake2.moves[0] != "up") && snake2.dy != -1) {
    //     snake2.moves.push("down");
    // } else if ((e.code == "ArrowLeft") && (snake2.moves.length == 0 || snake2.moves[0] != "right") && snake2.dx != 1) {
    //     snake2.moves.push("left");
    // } else if ((e.code == "ArrowRight") && (snake2.moves.length == 0 || snake2.moves[0] != "left") && snake2.dx != -1) {
    //     snake2.moves.push("right");
    // }

}

function gameOver(winner) {
    clearInterval(gameLoop);

    context.save();
    context.translate(snake1.headX + block / 2, snake1.headY + block / 2);
    if (snake1.dx == -1) context.rotate(Math.PI/180 * 180);
    if (snake1.dy == 1) context.rotate(Math.PI/180 * 90);
    if (snake1.dy == -1) context.rotate(Math.PI/180 * 270);
    context.drawImage(images.deadImage, -block / 2, -block / 2, block, block); 
    context.restore();

    context.fillStyle = "#000000";
    context.font = "50px Arial";
    context.fillText(`Player ${winner} wins`, game.width / 2 - 3.5 * block, game.height / 2);
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