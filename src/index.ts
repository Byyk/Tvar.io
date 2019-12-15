import {bootstrap} from "./bootstrap";
import p5 = require("p5");
import './style.scss';
import {drawGrid} from "./functions/DrawGrid";

bootstrap();

const dilek = 50;

new p5((p5: p5) => {
    let y = 10;
    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight);
        p5.stroke(255);
        p5.frameRate(60);
    };

    p5.draw = () => {
        p5.background(0);
        drawGrid(p5, y ,10, dilek);
        y += 5;
    };

    window.addEventListener('resize', () => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);
    });
}, document.getElementsByName('body')[0]);

/*
connection.start().then(functions () {
    (document.getElementById("sendButton")! as HTMLButtonElement).disabled = false;
}).catch(functions (err: string) {
    return console.error(err.toString());
});

document.getElementById("sendButton")!.addEventListener("click", functions (event) {
    var user = (document.getElementById("userInput")! as HTMLInputElement).value;
    var message = (document.getElementById("messageInput")! as HTMLInputElement).value;
    connection.invoke("SendMessage", user, message).catch(functions (err: string) {
        return console.error(err.toString());
    });
    event.preventDefault();
});*/