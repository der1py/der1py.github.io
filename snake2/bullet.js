export class Bullet {
    constructor(x, y, dx, dy, team) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.team = team;
        this.speed = 10
        this.block = 35;
        if (this.dx == 1) { 
            this.x += this.block + 32 - 5;
            this.y -= 9;
        }
        if (this.dx == -1) { 
            this.x -= (this.block + 32 - 5);
            this.y += 9;
        }
        if (this.dy == 1) { 
            this.x += 9; 
            this.y += (this.block + 32 - 5);
        }
        if (this.dy == -1) { 
            this.x -= 9; 
            this.y -= (this.block + 32 - 5);
        }
    }

    update (context, images) {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;

        /* square bullet */

        // context.fillStyle = `rgb(255, 255, 255)`;
        // context.fillRect(this.x, this.y, 35, 35);

        // draw bullet image

        context.save();
        context.translate(this.x + this.block / 2, this.y + this.block / 2);
        if (this.dx == -1) { 
            context.rotate(Math.PI/180 * 180);
        }
        if (this.dy == 1) { 
            context.rotate(Math.PI/180 * 90); 
        }
        if (this.dy == -1) { 
            context.rotate(Math.PI/180 * 270); 
        }
        context.drawImage(images.bulletImage, -this.block / 2, -this.block / 2, this.block, this.block); 
        context.restore();
    }
}