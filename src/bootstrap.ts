// vysvětleni -> index.ts
import P5 = require("p5");
import Victor = require("victor");
import {drawGrid} from "./functions/DrawGrid";
import {BasicServiceManager} from "./services/BasicServiceManager";
import {initServices} from "./services/ServicesModule";

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
    const speedMultiplayer = 6;

    const vector = new Victor(0, 0);

    let image: any;

    new P5((p5: P5) => {

        // y pozice v areně
        let y = 500;
        let x = 500;
        let stop = true;

        // funkce setup (volá se na začátku a pouze jednou)
        p5.setup = () => {
            // vytvoř canvas o velikosti okna
            p5.createCanvas(window.innerWidth, window.innerHeight);

            // barva vykreslování
            p5.stroke(255);

            p5.smooth();

            // počet snímku za sekundu (počet volání metody draw za sekundu)
            p5.frameRate(30);

            image = p5.loadImage('static/skin_test.svg');
        };

        // metoda draw, volaná při každém framu, vykresluje
        p5.draw = () => {
            // vykreslení bílého pozadí
            p5.background(0);
            // funkce vykreslující grid (mříšku)
            p5.stroke(100);
            p5.strokeWeight(1);
            drawGrid(p5, Math.floor(y), Math.floor(x), dilek);

            p5.fill(p5.color("#003000"));
            p5.stroke(p5.color("#600000"));
            p5.strokeWeight(10);
            p5.noFill();
            p5.image(image, window.innerWidth / 2 - 68,
                window.innerHeight / 2 - 60, 120, 120);
            p5.circle(Math.floor(p5.width / 2), Math.floor(p5.height / 2), 100);
        };

        // even když se změní velikost okna
        window.addEventListener('resize', () => {
            // nastavení velikosti canvasu na velikost okna
            p5.resizeCanvas(window.innerWidth, window.innerHeight, false);
        });

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key == "b") stop = !stop;
            if (stop) vector.zero();
        });

        window.addEventListener('mousemove', (e: MouseEvent) => {
            vector.x = (e.y - window.innerHeight / 2) / (window.innerHeight / 4);
            vector.y = (e.x - window.innerWidth / 2) / (window.innerWidth / 4);
            if (vector.length() > 1) vector.norm();
            if (stop) vector.zero();
        });

        const yBound = 3000;
        const xBound = 3000;

        // update loop
        setInterval(() => {
            // posun po ose x
            x = Math.max(Math.min(x - vector.x * speedMultiplayer, xBound), 0);
            // posun po ose y
            y = Math.max(Math.min(y - vector.y * speedMultiplayer, yBound), 0);
            
        }, 1000 / 30);
    }, document.getElementsByName('body')[0]);
});
