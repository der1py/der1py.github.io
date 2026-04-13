import { Particle } from "./Particle.js";

export class GroundParticle extends Particle {
    constructor(x, y, color, Kvx = 3, Kvy = -5) {
        super(x, y, 0, 0);
        this.vx = (Math.random() - 0.5) * 5 + Kvx;
        this.vy = (Math.random() - 1) * 2 + Kvy;
        this.size = Math.random() * 2 + 4;
        this.color = color;
        this.life = 40;
        this.active = true;

        this.y -= this.size * 0.4;
        this.x -= this.size;
    }
}