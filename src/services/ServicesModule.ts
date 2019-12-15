import {BasicServiceManager} from "./BasicServiceManager";
import {SignalService} from "./signal.service";
import {GameService} from "./GameService";

// názvy servis z třídy SegnalSerice (bude jich více)
// zatím neřešit
type signalServices = 'game-signal' | 'chat-signal';

export const initServices = (manager: BasicServiceManager) => {
    // přidej game-signal service
    manager.addService('game-signal' as signalServices, new SignalService('/game'));

    // přidej game-serivice
    manager.addService(typeof GameService, new GameService(
        // získání game-signal servisi pro constructor
        manager.getService('game-signal' as signalServices)
    ));
};