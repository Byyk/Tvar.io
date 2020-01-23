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

    pulse: number;
    pulseUp: boolean;

    mass = 0.5;

    constructor(p5: P5, xBound: number, yBound: number) {
        this.reSpawn(p5, xBound, yBound);
        this.pulse = Math.floor(Math.random() * 15);
        this.pulseUp = true;
    }

    draw(p5: P5, screenX: number, screenY: number, scale: number) {
        const x = Math.floor((screenX - this.x) * scale);
        const y = Math.floor((screenY - this.y) * scale);
        const mass = Math.floor(((this.mass * 26) + this.pulse / 5) * scale);
        if (this.pulseUp) this.pulse++;
        else this.pulse--;

        if (this.pulse == 15) this.pulseUp = false;
        if (this.pulse == 0) this.pulseUp = true;

        if (x + mass < 0 || y + mass < 0 || x - mass > p5.width || y - mass > p5.height)
            return null;

        p5.fill(this.color);
        p5.noStroke();

        if (this.type == FoodType.circle)
            p5.circle(Math.floor(x), Math.floor(y), 2 * mass);
        if (this.type == FoodType.rectangle)
            p5.rect(x - mass / 2, y - mass / 2, 2 * mass, 2 * mass);
        if (this.type == FoodType.triangle)
        p5.triangle(x - mass, y + mass,
            x + mass, y + mass, x, y - mass);
    }

    reSpawn(p5: P5, xBound: number, yBound: number) {
        this.x = Math.random() * xBound;
        this.y = Math.random() * yBound;
        const rand = Math.random() * 100;
        if (rand < 10) this.type = FoodType.triangle;
        if (rand < 15 && rand >= 10) this.type = FoodType.rectangle;
        if (rand >= 15) this.type = FoodType.circle;
        this.mass = Math.floor((Math.random() * 0.15 + 0.35) * 10) / 10;

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
