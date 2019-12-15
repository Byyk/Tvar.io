// vysvětleni -> index.ts
import {initServices} from "./services/ServicesModule";
import {BasicServiceManager} from "./services/BasicServiceManager";
import {drawGrid} from "./functions/DrawGrid";
import p5 = require("p5");

// funkce bootstrap (inicializace aplikace)
export const bootstrap = (() => {
    // vytvoření manažera service manažera
    const serviceManager = new BasicServiceManager();

    // inicializace servis
    // Zde jsou vytvářené instance servis, serivisa -> jedináček
    initServices(serviceManager);

    // velikost dílku
    // work in progress
    const dilek = 50;

    // vytvoření instance p5 (objekt z knihovny p5.js)
    new p5((p5: p5) => {

        // y pozice v areně
        let y = 10;
        let x = 10;

        // funkce setup (volá se na začátku a pouze jednou)
        p5.setup = () => {
            // vytvoř canvas o velikosti okna
            p5.createCanvas(window.innerWidth, window.innerHeight);

            // barva vykreslování
            p5.stroke(255);

            // počet snímku za sekundu (počet volání metody draw za sekundu)
            p5.frameRate(60);
        };

        // metoda draw, volaná při každém framu, vykresluje
        p5.draw = () => {
            // vykreslení bílého pozadí
            p5.background(0);

            // funkce vykreslující grid (mříšku)
            drawGrid(p5, y ,x, dilek);
        };

        // even když se změní velikost okna
        window.addEventListener('resize', () => {
            // nastavení velikosti canvasu na velikost okna
            p5.resizeCanvas(window.innerWidth, window.innerHeight, false);
        });

        // update loop
        setInterval(() => {
            // posun po ose y
            y += 2.6;
            // posun po ose x
            x += 2.6;

            // todo: vektory (rychlost pohybu)
        }, 20);
    }, document.getElementsByName('body')[0]);
});