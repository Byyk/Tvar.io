import * as signalR from '@microsoft/signalr';
import {from, Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

// class SignalService
export class SignalService<T = string> {

    // stav připojení work in progress -> je třeba zajit aby emitnul false
    // v případě ztráty připojení
    public connected: Observable<boolean>;
    // připojení na web socket
    private connection: signalR.HubConnection;

    // konstruktor třídy
    // hubAddress -> adresa hubu na backendu (hub -> websocket)
    constructor(hubAddress: string) {


    }

    // subsribe na websocket
    // metoda -> dava najevo o co jde například
    // ReceiveMessage, playerJoinedTheGame, etc.
    // newMethod -> funkce zavalaná když dojde k eventu (vzdálenému zavolání z websocket)
    on(method: T, newMethod: (...args: any[]) => void) {
        // zpracování funkce z knihovny
        // není třeba chápat
        if(typeof method == 'string') this.connection.on(method , newMethod);
        // pro případ že by někdo zadal do metody něco jiného než string :)
        else throw 'method is not a string';
    }

    // invoke metody na websocketu
    // zavolání fce na backendu
    // method -> nazev metody na serveru třeba sendMessage, joinGroup, etc.
    invoke(method: T, ...args: any[]) {
        // zpracování funkce z knihovny
        // není třeba chápat
        if(typeof method == 'string') return from(this.connection.invoke(method, args));
        // pro případ že by někdo zadal do metody něco jiného než string :)
        else throw 'method is not a string';
    }
}