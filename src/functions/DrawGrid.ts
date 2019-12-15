import * as p5 from "p5";

// vykreslení gridu
export function drawGrid(p5: p5, beginW: number, beginH: number, dilek: number) {
    // šířka (výpočet počátku/posunu)
    let width = beginW % dilek;
    // výška (výpočet počátku/posunu)
    let height = beginH % dilek;

    // dokud je šířka menší než šířka kanvasu (šířka -> pozize x čáry)
    while (width < p5.width) {
        // vykreslení čáry, jako v C# draLine
        p5.line(width, 0, width, p5.height);

        // zvětšení šířky o velikost dílku
        width += dilek;
    }

    // to samé jen s výškou
    while (height < p5.height) {
        p5.line(0, height, p5.width, height);
        height += dilek;
    }
}