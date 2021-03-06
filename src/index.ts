// importy knihoven a codu z jiných souborů
// pro náhled -> CTRL + Click
// @ts-ignore
import * as d from '../node_modules/rippler/dist/js/';
import {bootstrap} from "./bootstrap";

// import stylů do js (budou zkompilovány do js) pomocí webpacku
import {BehaviorSubject} from "rxjs";
import {backgroundBalls} from "./functions/background";
import {ConnectHub} from "./functions/HubConnection";
import './style.scss';
const userName = '';
const {connection, connected} = ConnectHub();
connected.subscribe(() => {
    let joined = new BehaviorSubject(false);
    connected.subscribe((conn) => {
            console.log(conn);
            if (!conn) return;
            connection.on('Send', (text) => {
               console.log(text);
            });

            joined.subscribe((val) => {
                if (!val) fetch('game.html').then((data) => {
                    data.text().then((text) => {
                        document.getElementsByTagName('body')[0].innerText = '';
                        document.getElementsByTagName('body')[0].innerHTML = text;
                        document.getElementById('btnLogin')!.addEventListener('click', () => {
                            joined.next(true);
                            connection.send('JoinRandomRoom',
                                (document.getElementById('userName') as HTMLInputElement)!.value).then();
                            document.getElementById('page')!.remove();
                        });
                        backgroundBalls();
                        connection.send('JoinRoom', 'room').then();
                    });
                });

                if (val) bootstrap(connection);
            });
        });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            joined.next(false);
        }
    });
});
