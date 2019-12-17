import {Food} from "../Model/food";
import P5 = require("p5");
import {GetPointDistance} from "../functions/PointDistance";



export class FoodService {
    food: Food[] = [];
    xBound: number | undefined;
    yBound: number | undefined;
    p5: P5 | undefined;
    constructor() {}

    init(p5: P5, xBound: number, yBound: number) {
        for (let i = 0; i < 300; i++) {
            this.food.push(new Food(p5, xBound, yBound));
        }
        this.xBound = xBound;
        this.yBound = yBound;
        this.p5 = p5;
    }

    checkFoodIntersection(x: number, y: number, mass: number) {
        for (let i = 0; i < this.food.length; i++) {
            if(GetPointDistance(x, y, this.food[i].x, this.food[i].y) <= mass)
            {
                this.food[i].reSpawn(this.p5!, this.xBound!, this.yBound!);
                return true;
            }
        }
        return false;
    }
}