import P5 = require("p5");

export class Player {
    x: number;
    y: number;
    mass: number;

    constructor(
        xMax: number,
        yMax: number,
        private strokeColor: P5.Color,
        private fill: P5.Color | P5.Image,
        private fixed = false
    ) {
        this.x = Math.random() * xMax;
        this.y = Math.random() * yMax;
        this.mass = 50;
    }

    draw(p5: P5, screenX: number, screenY: number) {
        const x = !this.fixed ? screenX - this.x : Math.floor(p5.width / 2);
        const y = !this.fixed ? screenY - this.y : Math.floor(p5.height / 2);

        if (x + this.mass < 0 || y + this.mass < 0 || x - this.mass > p5.width || y - this.mass > p5.height)
            return null;

        // fixme redudantni volaní!

        if (x < 0 || y < 0) console.log('kurva');

        p5.strokeWeight(10);
        p5.stroke(this.strokeColor);
        if (this.fill instanceof P5.Color) p5.fill(this.fill);
        else if (this.fill instanceof P5.Image) {
            p5.noFill();
            p5.image(this.fill, x - this.mass, y - this.mass, this.mass * 2, this.mass * 2);
        }
        p5.circle(Math.floor(x), Math.floor(y), this.mass * 2);
    }
}
