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
        this.mass = 30;
    }

    draw(p5: P5, screenX: number, screenY: number, scale: number) {
        const x = Math.floor((!this.fixed ? (screenX - this.x) * scale : p5.width / 2));
        const y = Math.floor((!this.fixed ? (screenY - this.y) * scale : p5.height / 2));

        const mass = Math.floor(this.mass * scale);

        if (x + mass < 0 || y + mass < 0 || x - mass > p5.width || y - mass > p5.height)
            return null;

        // fixme redudantni volaní!
        p5.strokeWeight(10);
        p5.stroke(this.strokeColor);
        if (this.fill instanceof P5.Color) p5.fill(this.fill);
        else if (this.fill instanceof P5.Image) {
            p5.noFill();
            p5.image(this.fill, x - mass, y - mass, mass * 2, mass * 2);
        }
        p5.circle(Math.floor(x), Math.floor(y), mass * 2);
    }
}
