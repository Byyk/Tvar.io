import {SignalService} from "./SignalService";
import {GameService} from "./GameService";
import {ResourcesService} from "./ResourcesService";
import {FoodService} from "./FoodService";

// názvy servis z třídy SegnalSerice (bude jich více)
// zatím neřešit
type signalServices = 'game-signal' | 'chat-signal';

export const initServices = () => {
    const game_signal = new SignalService('/game');
    const resource_service = new ResourcesService();
    const game_service = new GameService(game_signal);
    const food_service = new FoodService();

    return {game_signal, resource_service, game_service, food_service};
};