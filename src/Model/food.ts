import P5 = require("p5");

const foodMass = 13;

export class Food {
    x: number;
    y: number;
    color: P5.Color;
    type: FoodType;

    constructor(p5: P5, xBound: number, yBound: number) {
        this.x = Math.random() * xBound;
        this.y = Math.random() * yBound;
        this.type = Math.floor(Math.random() * 4);
        this.color = randomColor(p5);
    }

    draw(p5: P5, screenX: number, screenY: number) {
        const x = screenX - this.x;
        const y = screenY - this.y;

        if (x + foodMass < 0 || y + foodMass < 0 || x - foodMass > p5.width || y - foodMass > p5.height)
            return null;

        p5.fill(this.color);
        p5.noStroke();

        if (this.type == FoodType.circle)
            p5.circle(Math.floor(x), Math.floor(y), 2 * foodMass);
        if (this.type == FoodType.rectangle)
            p5.rect(x, y, 2 * foodMass, 2 * foodMass);
        if (this.type == FoodType.triangle)
        p5.triangle(x - foodMass, y + foodMass,
            x + foodMass, y + foodMass, x, y - foodMass);
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
