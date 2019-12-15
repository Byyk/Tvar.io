import * as p5 from "p5";


export function drawGrid(p5: p5, beginW: number, beginH: number, dilek: number) {
    let width = beginW % dilek;
    let height = beginH % dilek;

    if(width > dilek) console.log(beginW % dilek);

    while (width < p5.width) {
        p5.line(width, 0, width, p5.height);
        width += dilek;
    }

    while (height < p5.height) {
        p5.line(0, height, p5.width, height);
        height += dilek;
    }
}