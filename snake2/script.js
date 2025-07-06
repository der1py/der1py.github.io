import { Snake } from './snake.js';
import { Bullet } from './bullet.js';
import { Effect } from './effect.js';

var block = 35;
var cols = 17;
var rows = 15;
var game;
var context;

var snake1;
var snake2;

var bullets;
var removeBullets;
var sounds;
var removeSounds;

var speed;

var foodX;
var foodY;

var score;
var score2;
var gameLoop;

var eatSound;
var deathSound;
var images;

var gameOverBool;
var players;
var selfCol;
var funMode;

var effects;
var removeEffects;

var lastFired = [Date.now(), Date.now()];

window.onload = function () {

    // very goated instructions
    alert("Controls:\nPlayer 1 - WASD\nPlayer 2 - Arrow Keys\nscroll down for settings\n\npro tip: the keys c and , may be useful in a certain gamemode");

    // Set game size
    game = document.getElementById("game");
    game.height = rows * block;
    game.width = cols * block;
    context = game.getContext("2d");
    
    document.addEventListener("keydown", keyPressed);

    document.getElementById("playBtn").addEventListener("click", init)
    
    document.getElementById("selfCol").addEventListener("click", function() {
        document.getElementById("selfCol").innerText = document.getElementById("selfCol").innerText == "Self-collision: On" ? "Self-collision: Off" : "Self-collision: On";
    });
    document.getElementById("endless").addEventListener("click", function() {
        document.getElementById("endless").innerText = document.getElementById("endless").innerText == "Endless Snakes: On" ? "Endless Snakes: Off" : "Endless Snakes: On";
    });
    document.getElementById("funMode").addEventListener("click", function() {
        document.getElementById("funMode").innerText = document.getElementById("funMode").innerText == "Fun Mode: On" ? "Fun Mode: Off" : "Fun Mode: On";
    });
    document.getElementById("players").addEventListener("click", function() {
        document.getElementById("players").innerText = document.getElementById("players").innerText == "Players: 2" ? "Players: 1 (VS CPU)" : "Players: 2";
    });

    eatSound = new sound("audio/take.mp3");
    deathSound = new sound("audio/bonk.mp3");

    // load images and init
    let loadedImgs = 0;
    images = {
        headImage: new Image(),
        deadImage: new Image(),
        head2Image: new Image(),
        dead2Image: new Image(),
        foodImage: new Image(),
        headArmedImage: new Image(),
        headArmed2Image: new Image(),
        bulletImage: new Image(),
        splatImage: new Image(),
        splat2Image: new Image()
    }
    images.headImage.src = "sprites/head.png";
    images.deadImage.src = "sprites/dead.png";
    images.head2Image.src = "sprites/head2.png";
    images.dead2Image.src = "sprites/dead2.png";
    images.foodImage.src = "sprites/apple.png";
    images.headArmedImage.src = "sprites/headArmed.png";
    images.headArmed2Image.src = "sprites/headArmed2.png";
    images.bulletImage.src = "sprites/bullet.png";
    images.splatImage.src = "sprites/splat.png";
    images.splat2Image.src = "sprites/splat2.png";

    for (let key in images) {
        images[key].onload = function () {
            loadedImgs++;
            if (loadedImgs >= 10) {
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

    speed = 5;

    gameOverBool = false;

    if (document.getElementById("selfCol").innerText == "Self-collision: On") selfCol = true;
    else selfCol = false;
    
    if (document.getElementById("funMode").innerText == "Fun Mode: On") funMode = true;
    else funMode = false;

    if (document.getElementById("players").innerText == "Players: 2") players = 2;
    else players = 1;

    let bodyLen = 15;
    if (document.getElementById("endless").innerText == "Endless Snakes: On") bodyLen = 893;

    snake1 = new Snake(block * 3, 3 * block, 1, funMode);
    for (let i = 0; i < bodyLen; i++) {
        snake1.body.push([snake1.headX - (i + 1) * speed, snake1.headY]);
    }

    snake2 = new Snake(cols * block - block * 4, rows * block - 4 * block, 2, funMode);
    for (let i = 0; i < bodyLen; i++) {
        snake2.body.push([snake2.headX + (i + 1) * speed, snake2.headY]);
    }

    bullets = [];
    removeBullets = [];
    sounds = [];
    removeSounds = [];
    effects = [];
    removeEffects = [];

    foodX = 8 * block;
    foodY = 7 * block;

    score = 0;
    score2 = 0;

    update();
    gameLoop = setInterval(update, 16);
}

function update() {
    score = Math.round(snake1.body.length / 7) - 1;
    score2 = Math.round(snake2.body.length / 7) - 1;
    document.getElementById("msg").innerText = "P1 Size: " + score;
    document.getElementById("msg2").innerText = "P2 Size: " + score2;

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

    // CPU Player
    if (players == 1 && !(snake2.dy == 0 && snake2.dx == 0)) {
        controlCPU();
    }

    // effects
    for (let i = 0; i < effects.length; i++) {
        effects[i].update(context, Date.now());
        if (Date.now() - effects[i].spawnTime >= effects[i].lifeTime) removeEffects.push(effects[i]);
    }
    effects = effects.filter(element => !removeEffects.includes(element));

    // draw food
    context.drawImage(images.foodImage, foodX, foodY);

    // draw and move snakes
    snake1.update(context, images);
    snake2.update(context, images);

    // draw and move bullets
    for (let i = 0; i < bullets.length; i ++) {
        bullets[i].update(context, images);
        if (bullets[i].x < 0 - block || bullets[i].x > game.width + block || bullets[i].y < 0 - block|| bullets[i].y > game.height + block) {
            removeBullets.push(bullets[i]);
        }
    }

    // bullet sounds
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].play();
        removeSounds.push(sounds[i]);
        sounds[i].removeWhenDone;
    }
    removeSounds = new Set(removeSounds);
    sounds = sounds.filter(element => !removeSounds.has(element));
    removeSounds = [];

    // collisions
    // ----------

    // food
    if (snake1.headX == foodX && snake1.headY == foodY) {
        foodX = Math.floor(Math.random() * (cols - 1)) * block
        foodY = Math.floor(Math.random() * (rows - 1)) * block
        for (let i = 0; i < 7; i++) {
            snake1.body.push([snake1.body[snake1.body.length - 1][0], snake1.body[snake1.body.length - 1][1]]);
        }
        eatSound.play();
    }

    if (snake2.headX == foodX && snake2.headY == foodY) {
        foodX = Math.floor(Math.random() * (cols - 1)) * block
        foodY = Math.floor(Math.random() * (rows - 1)) * block
        for (let i = 0; i < 7; i++) {
            snake2.body.push([snake2.body[snake2.body.length - 1][0], snake2.body[snake2.body.length - 1][1]]);
        }
        eatSound.play();
    }

    // edge
    let snake1dead = (snake1.headX < 0 || snake1.headY < 0 || snake1.headX > game.width - block || snake1.headY > game.height - block);
    let snake2dead = (snake2.headX < 0 || snake2.headY < 0 || snake2.headX > game.width - block || snake2.headY > game.height - block);

    // body
    for (let i = 7; i < snake1.body.length; i++) {
        if (i > 14 && selfCol && rectCollide(snake1.headX, snake1.headY, block, block, snake1.body[i][0], snake1.body[i][1], block, block)) {
            snake1dead = true;
        }
        if (rectCollide(snake2.headX, snake2.headY, block, block, snake1.body[i][0], snake1.body[i][1], block, block)) {
            snake2dead = true;
        }
    }

    for (let i = 7; i < snake2.body.length; i++) {
        if (i > 14 && selfCol && rectCollide(snake2.headX, snake2.headY, block, block, snake2.body[i][0], snake2.body[i][1], block, block)) {
            snake2dead = true;
        }
        if (rectCollide(snake1.headX, snake1.headY, block, block, snake2.body[i][0], snake2.body[i][1], block, block)) {
            snake1dead = true;
        }
    }

    // head

    if (rectCollide(snake1.headX, snake1.headY, block, block, snake2.headX, snake2.headY, block, block)) {
        snake1dead = true;
        snake2dead = true;
    }

    // collisions with bullets
    for (let i = 0; i < bullets.length; i++) {
        // set up hitbox
        let hitboxX = bullets[i].x;
        let hitboxY = bullets[i].y;
        let bulletWidth;
        let bulletHeight;
        let bulletOffset = 14;
        if (bullets[i].dy == 0) {
            hitboxY += bulletOffset;
            bulletHeight = 5;
            bulletWidth = block;
        } else {
            hitboxX += bulletOffset;
            bulletHeight = block;
            bulletWidth = 5;
        }

        // head collision
        if (rectCollide(hitboxX, hitboxY, bulletWidth, bulletHeight, snake1.headX, snake1.headY, block, block)) {
            snake1dead = true;
        }
        if (rectCollide(hitboxX, hitboxY, bulletWidth, bulletHeight, snake2.headX, snake2.headY, block, block)) {
            snake2dead = true;
        }

        // body collision
        for (let j = 0; j < snake1.body.length; j++) {
            if (rectCollide(hitboxX, hitboxY, bulletWidth, bulletHeight, snake1.body[j][0], snake1.body[j][1], block, block)) {
                snake1.removeBody.push(snake1.body[j]);
                removeBullets.push(bullets[i]);
            }
        }

        for (let j = 0; j < snake2.body.length; j++) {
            if (rectCollide(hitboxX, hitboxY, bulletWidth, bulletHeight, snake2.body[j][0], snake2.body[j][1], block, block)) {
                snake2.removeBody.push(snake2.body[j]);
                removeBullets.push(bullets[i]);
            }
        }
    }

    // remove destroyed body segments
    if (snake1.removeBody.length > 0) effects.push(new Effect(images.splatImage, snake1.removeBody[0][0], snake1.removeBody[0][1], 55, 55, 1000));
    for (let i = 0; i < snake1.removeBody.length; i++) {
        snake1.body.pop();
    }
    if (snake2.removeBody.length > 0) effects.push(new Effect(images.splat2Image, snake2.removeBody[0][0], snake2.removeBody[0][1], 55, 55, 1000));
    for (let i = 0; i < snake2.removeBody.length; i++) {
        snake2.body.pop();
    }
    snake1.removeBody = [];
    snake2.removeBody = [];

    // remove bullets
    bullets = bullets.filter(element => !removeBullets.includes(element));

    // snakes die if too short
    if (score < 0) snake1dead = true;
    if (score2 < 0) snake2dead = true;

    // game over
    if (snake1dead && snake2dead) {
        gameOver(0);
    } else if (snake1dead) {
        gameOver(2);
    } else if (snake2dead) {
        gameOver(1);
    }
}

function controlCPU() {
    let candidates = [];
    let directions = []
    let scores = [];
    if (snake2.headX % block == 0 && snake2.headY % block == 0) {
        if (snake2.dy == 0) {
            candidates = ["", "down", "up"];
            directions = [[snake2.dx, 0], [0, 1], [0, -1]];
        } else if (snake2.dx == 0) {
            candidates = ["", "right", "left"];
            directions = [[0, snake2.dy], [1, 0], [-1, 0]];
        }

        let scoreAndIndex = [-9999, 0];
        for (let i = 0; i < candidates.length; i++) {
            scores[i] = evaluateMove(directions[i][0], directions[i][1]);
            if (scores[i] > scoreAndIndex[0]) scoreAndIndex = [scores[i], i];
        }

        if (candidates[scoreAndIndex[1]] != "") snake2.moves.push(candidates[scoreAndIndex[1]]);
    }

    if (funMode && ((snake2.dx == 1 && snake1.headX > snake2.headX) || (snake2.dx == -1 && snake1.headX < snake2.headX) || 
    (snake2.dy == 1 && snake1.headY > snake2.headY) || (snake2.dy == -1 && snake1.headY < snake2.headY))) { 
        tryToShoot(1, snake2.headX, snake2.headY, snake2.dx, snake2.dy);
    }
}

function evaluateMove(dx, dy) { 
    let score = 0;
    let centerWeight = 0.7;

    // don't die
    if (snake2.headX + dx * speed > game.width - block || snake2.headX + dx * speed < 0 || 
        snake2.headY + dy * speed > game.height - block || snake2.headY + dy * speed < 0 ||
    bodyCollide(snake2.headX + speed * dx, snake2.headY + speed * dy, block, block, snake1) || 
    (selfCol && bodyCollide(snake2.headX + speed * dx, snake2.headY + speed * dy, block, block, snake2, true))) {
        score -= 999;
    }

    // try to center and go for food
    if (dx == 1) {
        score += (game.width - snake2.headX) * centerWeight;
        if (foodX > snake2.headX) score += funMode ? 300 : 500;
    } else if (dx == -1) {
        score += snake2.headX * centerWeight;
        if (foodX < snake2.headX) score += funMode ? 300 : 500;
    } else if (dy == 1) {
        score += (game.height - snake2.headY) * centerWeight;
        if (foodY > snake2.headY) score += funMode ? 300 : 500;
    } else if (dy == -1) {
        score += snake2.headY * centerWeight;
        if (foodY < snake2.headY) score += funMode ? 300 : 500;
    }

    // take the draw
    if (snake2.headX + dx * block == snake1.headX + snake1.dx * block &&
        snake2.headY + dy * block == snake1.headY + snake1.dy * block
    ) {
        score += 999;
    }

    // avoid line of fire
    if (snake2.headX + dx * block == snake1.headX + snake1.dx * block) {
        score -= 300;
    }
    if (snake2.headY + dy * block == snake1.headY + snake1.dy * block) {
        score -= 300;
    }

    // avoid enemy bullets
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].team == 0) {
            if (Math.abs((snake2.headX + dx * block) - bullets[i].x) < Math.abs(snake2.headX - bullets[i].x)) {
                score -= Math.max(0, 500 - 2 * Math.abs((snake2.headX + dx * block) - bullets[i].x));
            }
            if (Math.abs((snake2.headY + dy * block) - bullets[i].y) < Math.abs(snake2.headY - bullets[i].y)) {
                score -= Math.max(0, 500 - 2 * Math.abs((snake2.headY + dy * block) - bullets[i].y));
            }
        }
    }

    return score;
}

function rectCollide(x1, y1, width1, height1, x2, y2, width2, height2) {
    return (x1 + width1 > x2 && x1 < x2 + width2 && y1 + height1 > y2 && y1 < y2 + height2);
}

function bodyCollide(x, y, width, height, s, self = false) {
    for (let j = 0; j < s.body.length; j++) {
        if (self && j == 0) { 
            if (s.body.length > 7) j = 7;
            else break;
        }
        if (rectCollide(x, y, width, height, s.body[j][0], s.body[j][1], block, block)) {
            return true;
        }
    }
    return false;
}

function keyPressed(e) {
    // prevent scrolling
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
    }

    if (snake1.dx == 0 && snake1.dy == 0) { 
        snake1.moves.push("right");
        snake2.moves.push("left");
    }

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
    if (players == 2) {
        if ((e.code == "ArrowUp") && (snake2.moves.length == 0 || snake2.moves[0] != "down") && snake2.dy != 1) {
            snake2.moves.push("up");
        } else if ((e.code == "ArrowDown") && (snake2.moves.length == 0 || snake2.moves[0] != "up") && snake2.dy != -1) {
            snake2.moves.push("down");
        } else if ((e.code == "ArrowLeft") && (snake2.moves.length == 0 || snake2.moves[0] != "right") && snake2.dx != 1) {
            snake2.moves.push("left");
        } else if ((e.code == "ArrowRight") && (snake2.moves.length == 0 || snake2.moves[0] != "left") && snake2.dx != -1) {
            snake2.moves.push("right"); 
        }
    }

    if (funMode) {
        if (e.code == "KeyC") {
            tryToShoot(0, snake1.headX, snake1.headY, snake1.dx, snake1.dy);
        }
        if (e.code == "Comma" && players == 2) {
            tryToShoot(1, snake2.headX, snake2.headY, snake2.dx, snake2.dy);
        }
    }

}

function tryToShoot(team, x, y, dx, dy) {
    if (Date.now() - lastFired[team] >= 200) {
        if (dx == 0 && dy == 0) {
            dx = team == 0 ? 1 : -1;
        }
        bullets.push(new Bullet(x, y, dx, dy, team));
        lastFired[team] = Date.now();
        if (sounds.length < 15) sounds.push(new sound("audio/9mm.wav"));
    }
}

function gameOver(winner) {
    if (gameOverBool) {
        return;
    }
    gameOverBool = true;
    clearInterval(gameLoop);

    // draw snake dead

    if (winner == 2 || winner == 0) {
        context.save();
        context.translate(snake1.headX + block / 2, snake1.headY + block / 2);
        if (snake1.dx == -1) context.rotate(Math.PI/180 * 180);
        if (snake1.dy == 1) context.rotate(Math.PI/180 * 90);
        if (snake1.dy == -1) context.rotate(Math.PI/180 * 270);
        context.drawImage(images.deadImage, -block / 2, -block / 2, block, block);
        context.restore();
    }
    if (winner == 1 || winner == 0) {
        context.save();
        context.translate(snake2.headX + block / 2, snake2.headY + block / 2);
        if (snake2.dx == -1) context.rotate(Math.PI/180 * 180);
        if (snake2.dy == 1) context.rotate(Math.PI/180 * 90);
        if (snake2.dy == -1) context.rotate(Math.PI/180 * 270);
        context.drawImage(images.dead2Image, -block / 2, -block / 2, block, block);
        context.restore();
    }

    context.fillStyle = "#000000";
    context.font = "50px Arial";
    if (winner == 0) context.fillText(`Draw`, game.width / 2 - 1 * block, game.height / 2);
    else context.fillText(`Player ${winner} wins`, game.width / 2 - 3.5 * block, game.height / 2);
    deathSound.play();
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

    this.remove = function() {
        document.body.removeChild(this.sound);
        this.sound = null;
    }

    this.removeWhenDone = function() {
        this.sound.addEventListener('ended', () => {
            this.remove();
        });
    }
}
