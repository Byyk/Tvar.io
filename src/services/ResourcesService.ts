import {FoodType} from "../Model/food";
import {Player} from "../Model/player";

export class ResourcesService {
    private triElement: HTMLParagraphElement;
    private rectangles: number = 1;
    private recElement: HTMLParagraphElement;
    private circles: number = 30;
    private cirElement: HTMLParagraphElement;

    // @ts-ignore
    private player: Player;

    set circs(value: number) {
        this.circles += value;
        this.cirElement.innerText = removeUnvantedDecimalPlaces(this.circles).toString();
        this.player.mass = this.circles;
    }

    set rects(value: number) {
        this.rectangles += value;
        this.recElement.innerText = removeUnvantedDecimalPlaces(Math.floor(this.rectangles * 100) / 100).toString();
    }

    set speedMinus(value: number) {
        if (this.rectangles - value > 0.5)
            this.rectangles -= value;
        else this.rectangles = 0.5;
        this.recElement.innerText = removeUnvantedDecimalPlaces(Math.floor(this.rectangles * 100) / 100).toString();
    }

    set trian(value: number) {
        if (this.circles - value > 30)
            this.circles -= value;
        else this.circles = 30;
        this.triElement.innerText = removeUnvantedDecimalPlaces(this.circles).toString();
        this.player.mass = this.circles;
    }

    constructor() {
        this.triElement = document.getElementById('mass-level') as HTMLParagraphElement;
        this.cirElement = document.getElementById('mass-level') as HTMLParagraphElement;
        this.recElement = document.getElementById('speed-level') as HTMLParagraphElement;

        this.cirElement.innerText = "30";
        this.recElement.innerText = "1";
    }

    init(player: Player) {
        this.player = player;
    }

    addResource(res: Array<{ type: FoodType, mass: number }>) {
        // tslint:disable-next-line:forin
        for (let jidlo of res) {
            switch (jidlo.type) {
                case FoodType.circle:
                    this.circs = jidlo.mass;
                    this.speedMinus = jidlo.mass / 1000;
                    break;
                case FoodType.rectangle:
                    this.rects = jidlo.mass / 1000;
                    break;
                case FoodType.triangle:
                    this.trian = jidlo.mass;
                    this.rects = jidlo.mass / 1000;
                    break;
            }
        }
    }
}

function removeUnvantedDecimalPlaces(num: number) {
    return Math.round(Math.floor(num * 100) / 10) / 10;
}
