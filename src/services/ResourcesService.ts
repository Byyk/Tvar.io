import { FoodType } from "../Model/food";

export class ResourcesService {
    private triangles: number = 0;
    private triElement: HTMLParagraphElement;
    private rectangles: number = 0;
    private recElement: HTMLParagraphElement;
    private circles: number = 0;
    private cirElement: HTMLParagraphElement;

    get circs() {
        return this.circles;
    }

    set circs(value: number) {
        this.circles = value;
        this.cirElement.innerText = value.toString();
    }

    get rects() {
        return this.rectangles;
    }

    set rects(value: number) {
        this.rectangles = value;
        this.recElement.innerText = value.toString();
    }

    get trian() {
        return this.triangles;
    }

    set trian(value: number) {
        this.triangles = value;
        this.triElement.innerText = value.toString();
    }

    constructor() {
        this.triElement = document.getElementById('tria-count') as HTMLParagraphElement;
        this.cirElement = document.getElementById('circ-count') as HTMLParagraphElement;
        this.recElement = document.getElementById('rect-count') as HTMLParagraphElement;

        this.cirElement.innerText = "0";
        this.triElement.innerText = "0";
        this.recElement.innerText = "0";
    }

    addResource(res: { type: FoodType, mass: number}) {
        switch (res.type) {
            case FoodType.circle: 
                this.circs += res.mass;
                break;
            case FoodType.rectangle:
                this.rects += res.mass;
                break;
            case FoodType.triangle:
                this.trian += res.mass;
                break;
        }
    }
}
