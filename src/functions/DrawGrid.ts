import * as P5 from "p5";

// vykreslení gridu
export function drawGrid(p5: P5, beginW: number, beginH: number, dilek: number, scale: number) {
    // šířka (výpočet počátku/posunu)
    let width = Math.floor((beginW % dilek) * scale);
    // výška (výpočet počátku/posunu)
    let height = Math.floor((beginH % dilek) * scale);

    p5.stroke(100);
    p5.strokeWeight(1);

    // dokud je šířka menší než šířka kanvasu (šířka -> pozize x čáry)
    while (width < p5.width) {
        // vykreslení čáry, jako v C# draLine
        p5.line(width, 0, width, p5.height);

        // zvětšení šířky o velikost dílku
        width += Math.floor(dilek * scale);
    }

    // to samé jen s výškou
    while (height < p5.height) {
        p5.line(0, height, p5.width, height);
        height += Math.floor(dilek * scale);
    }
}