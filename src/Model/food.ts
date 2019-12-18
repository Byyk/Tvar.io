import P5 = require("p5");

export class Food {
    // @ts-ignore
    x: number;
    // @ts-ignore
    y: number;
    // @ts-ignore
    color: P5.Color;
    // @ts-ignore
    type: FoodType;

    mass = 13;

    constructor(p5: P5, xBound: number, yBound: number) {
        this.reSpawn(p5, xBound, yBound);
    }

    draw(p5: P5, screenX: number, screenY: number) {
        const x = screenX - this.x;
        const y = screenY - this.y;

        if (x + this.mass < 0 || y + this.mass < 0 || x - this.mass > p5.width || y - this.mass > p5.height)
            return null;

        p5.fill(this.color);
        p5.noStroke();

        if (this.type == FoodType.circle)
            p5.circle(Math.floor(x), Math.floor(y), 2 * this.mass);
        if (this.type == FoodType.rectangle)
            p5.rect(x, y, 2 * this.mass, 2 * this.mass);
        if (this.type == FoodType.triangle)
        p5.triangle(x - this.mass, y + this.mass,
            x + this.mass, y + this.mass, x, y - this.mass);
    }

    reSpawn(p5: P5, xBound: number, yBound: number) {
        this.x = Math.random() * xBound;
        this.y = Math.random() * yBound;
        this.type = Math.floor(Math.random() * 3);
        this.color = randomColor(p5);
    }

}

export enum FoodType {
    triangle,
    circle,
    rectangle
}

function randomColor(p5: P5) {
    return p5.color(
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        );
}
