// vysvětleni -> index.ts
import P5 = require("p5");
import Victor = require("victor");
import {drawGrid} from "./functions/DrawGrid";
import {Food, FoodType} from "./Model/food";
import {Player} from "./Model/player";
import {initServices} from "./services/ServicesModule";
import * as ts from "typescript/lib/tsserverlibrary";
import maxProgramSizeForNonTsFiles = ts.server.maxProgramSizeForNonTsFiles;

// funkce bootstrap (inicializace aplikace)
export const bootstrap = (() => {
    createStats();
    // inicializace servis
    // Zde jsou vytvářené instance servis, serivisa -> jedináček
    const services = initServices();

    // velikost dílku
    // work in progress
    const dilek = 50;
    const speedMultiplayer = 15;

    const vector = new Victor(0, 0);

    let image: any;

    new P5((p5: P5) => {

        const yBound = 3000;
        const xBound = 3000;
        const players: Player[] = [];
        const food: Food[] = services.food_service.food;

        let player: Player;
        let x = 800;
        let y = 800;
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

            /*for (let i = 0; i < 50; i++) {
                players.push(new Player(xBound, yBound,
                    p5.color('#F55'),
                    image));
            }*/
            players.push(player);
            services.food_service.init(p5, xBound, yBound);
            services.resource_service.init(player);
            /*const foo = new Food(p5, 100,100);
            foo.x = 800;
            foo.y = 800;
            food.push(foo);*/
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
                y - vector.y * speedMultiplayer,
                yBound + window.innerWidth / 2),
                window.innerHeight / 2));
            // posun po ose x
            x = Math.floor(Math.max(Math.min(
                x - vector.x * speedMultiplayer,
                xBound + window.innerWidth / 2),
                window.innerWidth / 2));

            let jidlo;
            if (player != null)
                jidlo = services.food_service.checkFoodIntersection(x - window.innerWidth / 2,
                    y - window.innerHeight / 2, player.mass);
            if (jidlo != null) {
                services.resource_service.addResource(jidlo);
            }

        }, 1000 / 30);
    }, document.getElementsByName('body')[0]);
});

function createStats() {
    const stats = document.createElement('div');
    stats.id = "stats";
    const statsInnerConatiner = document.createElement('div');
    const image = document.createElement('img');
    image.src = '/static/radius.png';
    statsInnerConatiner.appendChild(image);
    const massLevel = document.createElement('p');
    massLevel.id = 'mass-level';
    statsInnerConatiner.appendChild(massLevel);
    stats.appendChild(statsInnerConatiner);

    const speedLevelContainer = document.createElement('div');
    const speedLevel = document.createElement('img');
    speedLevel.src = '/static/flash.png';
    speedLevelContainer.appendChild(speedLevel);
    const speedLevelP = document.createElement('p');
    speedLevelP.id = 'speed-level';
    speedLevelContainer.appendChild(speedLevelP);
    stats.appendChild(speedLevelContainer);
    document.getElementsByTagName('body')[0].appendChild(stats);
}
