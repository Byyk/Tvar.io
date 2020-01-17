import * as signalR from "@microsoft/signalr";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

export const ConnectHub = () => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(hubAddress).build();

    const connected = new Observable<boolean>((subscriber) => {
        // emitni false
        subscriber.next(false);

        // otevření spojení
        connection.start().then(() => {
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

    return {connection, connected};
};
