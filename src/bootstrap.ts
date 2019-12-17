// vysvětleni -> index.ts
import P5 = require("p5");
import Victor = require("victor");
import {drawGrid} from "./functions/DrawGrid";
import {Food, FoodType} from "./Model/food";
import {Player} from "./Model/player";
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
    const speedMultiplayer = 8;

    const vector = new Victor(0, 0);

    let image: any;

    new P5((p5: P5) => {

        const yBound = 3000;
        const xBound = 3000;
        const players: Player[] = [];
        const food: Food[] = [];

        let player: Player;
        let x = 500;
        let y = 500;
        let stop = true;

        // funkce setup (volá se na začátku a pouze jednou)
        p5.setup = () => {
            // vytvoř canvas o velikosti okna
            p5.createCanvas(window.innerWidth, window.innerHeight);

            // barva vykreslování
            p5.stroke(255);

            p5.smooth();

            // počet snímku za sekundu (počet volání metody draw za sekundu)
            p5.frameRate(60);

            image = p5.loadImage('static/skin_test.svg');
            player = new Player(xBound, yBound,
                p5.color('#F55'),
                image, true);

            for (let i = 0; i < 50; i++) {
                players.push(new Player(xBound, yBound,
                    p5.color('#F55'),
                    image));
            }
            players.push(player);

            for (let i = 0; i < 100; i++) {
                food.push(new Food(p5, xBound, yBound));
            }
        };

        // metoda draw, volaná při každém framu, vykresluje
        p5.draw = () => {
            // vykreslení bílého pozadí
            p5.background(0);
            // funkce vykreslující grid (mříšku)
            drawGrid(p5, Math.floor(x), Math.floor(y), dilek);
            for (let i = 0; i < food.length; i++) {
                food[i].draw(p5, x, y);
            }

            for (let i = 0; i < players.length; i++) {
                players[i].draw(p5, x, y);
            }
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
            vector.x = (e.x - window.innerWidth / 2) / (window.innerWidth / 4);
            vector.y = (e.y - window.innerHeight / 2) / (window.innerHeight / 4);
            if (vector.length() > 1) vector.norm();
            if (stop) vector.zero();
        });

        // update loop
        setInterval(() => {
            // posun po ose y
            y = Math.floor(Math.max(Math.min(
                y - vector.y * speedMultiplayer, yBound), 0));
            // posun po ose x
            x = Math.floor(Math.max(Math.min(
                x - vector.x * speedMultiplayer, xBound), 0));
        }, 1000 / 30);
    }, document.getElementsByName('body')[0]);
});
