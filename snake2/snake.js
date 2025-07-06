export class Snake {
    constructor (x, y, team, funMode) {
        this.headX = x;
        this.headY = y;
        this.team = team;
        this.block = 35;
        this.dx = 0;
        this.dy = 0;
        this.moves = [];
        this.body = [];
        this.speed = 5;
        this.funMode = funMode;
        this.removeBody = [];
    }

    update (context, images) {
        // change movement
        if (this.moves.length > 0 && this.headX % this.block == 0 && this.headY % this.block == 0) {
            switch (this.moves.shift()) {
                case "up":
                    this.dx = 0;
                    this.dy = -1;
                    break;
                case "down":
                    this.dx = 0;
                    this.dy = 1;
                    break;
                case "left":
                    this.dx = -1;
                    this.dy = 0;
                    break;
                case "right":
                    this.dx = 1;
                    this.dy = 0;
                    break;
            }
        }

        this.headX += this.dx * this.speed;
        this.headY += this.dy * this.speed;

        let initBodyCol = Math.max(250 - Math.floor(this.body.length / 3), 100);
        let bodyCol = initBodyCol;
        for (let i = this.body.length - 1; i >= 0; i--) {
            bodyCol += Math.floor((255 - initBodyCol) / i);
            context.fillStyle = this.team == 1 ? `rgb(${bodyCol}, 0, 0)` : `rgb(0, 0, ${bodyCol})`;
            context.fillRect(this.body[i][0], this.body[i][1], this.block, this.block);
            if (this.dx != 0 || this.dy != 0) {
                if (i == 0) this.body[i] = [this.headX, this.headY];
                else this.body[i] = [this.body[i - 1][0], this.body[i - 1][1]];
            }
        }

        context.save();
        context.translate(this.headX + this.block / 2, this.headY + this.block / 2);
        if (this.dx == -1 || (this.team == 2 && this.dx == 0 && this.dy == 0)) context.rotate(Math.PI/180 * 180);
        if (this.dy == 1) context.rotate(Math.PI/180 * 90);
        if (this.dy == -1) context.rotate(Math.PI/180 * 270);
        
        // draw head
        if (this.funMode) {
            context.drawImage(this.team == 1 ? images.headArmedImage : images.headArmed2Image, -this.block / 2, -this.block / 2, this.block * 2, this.block); 
            context.restore();
        }
        else {
            context.drawImage(this.team == 1 ? images.headImage : images.head2Image, -this.block / 2, -this.block / 2, this.block, this.block); 
            context.restore();
        }
    }
    
}