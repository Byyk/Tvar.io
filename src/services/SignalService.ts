import * as signalR from '@microsoft/signalr';
import {from, Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

// class SignalService
export class SignalService<T = string> {
    // připojení na web socket
    private connection: signalR.HubConnection;

    // stav připojení work in progress -> je třeba zajit aby emitnul false
    // v případě ztráty připojení
    public connected: Observable<boolean>;

    // konstruktor třídy
    // hubAddress -> adresa hubu na backendu (hub -> websocket)
    constructor(hubAddress: string) {

        // připojení na websocket
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(hubAddress).build();

        // Observable -> jako eventy v C#
        // metoda subsribe spustí observable a observable zavolá callback při
        // každé změně hodnoty
        this.connected = new Observable<boolean>(subscriber => {
            // emitni false
            subscriber.next(false);

            // otevření spojení
            this.connection.start().then(() => {
                // v případě úspěchu emitne true
                subscriber.next(true);
                console.log('game socket connected');
            }).catch(() => {
                // v případě neúspěch vypíše do console chybu
                // todo: notifikovat uživatele o chybě
                console.log('game socket connection error');
            });
            // dokončit observable
            subscriber.complete();
            // metoda pipe upravuje observable
            // share replay zajišťuje aby se code v observablu nevolal více krát (při každém zavolání subscribe)
        }).pipe(shareReplay());
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