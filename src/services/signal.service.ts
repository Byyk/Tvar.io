import * as signalR from '@microsoft/signalr';
import {from, Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

export class SignalService<T = string> {
    private connection: signalR.HubConnection;
    public connected: Observable<boolean>;

    constructor(hubAddress: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(hubAddress).build();

        this.connected = new Observable<boolean>(subscriber => {
            subscriber.next(false);
            this.connection.start().then(() => {
                subscriber.next(true);
                console.log('game socket connected');
            }).catch(() => {
                console.log('game socket connection error');
            });
            subscriber.complete();
        }).pipe(shareReplay());
    }

    on(method: T, newMethod: (...args: any[]) => void) {
        if(typeof method == 'string') this.connection.on(method , newMethod);
        else throw 'method is not a string';
    }

    invoke(method: T, ...args: any[]) {
        if(typeof method == 'string') return from(this.connection.invoke(method, args));
        else throw 'method is not a string';
    }
}