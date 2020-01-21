import * as signalR from "@microsoft/signalr";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

export const ConnectHub = () => {
    const hubAddress = '/game';
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(hubAddress).build();

    const connected = new Observable<boolean>((subscriber) => {
        // emitni false
        // otevření spojení
        connection.start().then(() => {
            // v případě úspěchu emitne true
            subscriber.next(true);
            console.log('game socket connected');
            subscriber.complete();
        }).catch(() => {
            // v případě neúspěch vypíše do console chybu
            // todo: notifikovat uživatele o chybě
            console.log('game socket connection error');
        });
        // dokončit observable
        // metoda pipe upravuje observable
        // share replay zajišťuje aby se code v observablu nevolal více krát (při každém zavolání subscribe)
    }).pipe(shareReplay());

    return {connection, connected};
};
