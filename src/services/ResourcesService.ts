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

    constructor() {
        this.triElement = document.getElementById('tria-count') as HTMLParagraphElement;
        this.cirElement = document.getElementById('circ-count') as HTMLParagraphElement;
        this.recElement = document.getElementById('rect-count') as HTMLParagraphElement;

        this.cirElement.innerText = "0";
        this.triElement.innerText = "0";
        this.recElement.innerText = "0";
    }

    addTriangles(tri: number) {

    }
}
