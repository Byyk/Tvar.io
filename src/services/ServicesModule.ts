import {BasicServiceManager} from "./BasicServiceManager";
import {SignalService} from "./signal.service";
import {GameService} from "./GameService";

type signalServices = 'game-signal' | 'chat-signal';

export const initServices = (manager: BasicServiceManager) => {
    manager.addService('game-signal' as signalServices, new SignalService('/game'));
    manager.addService(typeof GameService, new GameService(
        manager.getService('game-signal' as signalServices)
    ));
};