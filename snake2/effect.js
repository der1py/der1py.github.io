export class Effect {
    constructor (img, x, y, width, height, lifeTime) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lifeTime = lifeTime;
        this.block = 35;
        this.spawnTime = Date.now();
    }

    update (context, currentTime) {
        let elapsedTime = currentTime - this.spawnTime;
        context.globalAlpha = Math.max(0, 1 - elapsedTime / this.lifeTime);
        context.drawImage(this.img, this.x - (this.width - this.block) / 2, this.y) - (this.height - this.block) / 2, this.width, this.height;
        context.globalAlpha = 1;
    }
}