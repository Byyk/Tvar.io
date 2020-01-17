// importy knihoven a codu z jiných souborů
// pro náhled -> CTRL + Click
import {bootstrap} from "./bootstrap";

// import stylů do js (budou zkompilovány do js) pomocí webpacku
import {ConnectHub} from "./functions/HubConnection";
import './style.scss';
const userName = '';
const {connection, connected} = ConnectHub();
connected.subscribe(() => {

    let joined = false;

    connected.subscribe(() => {
        if (!joined) fetch('game.html').then((data) => {
            data.text().then((text) => {
                document.getElementsByTagName('body')[0].innerHTML = text;
            });
        });

        if (joined) bootstrap();
    });
});