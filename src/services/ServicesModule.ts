import {FoodService} from "./FoodService";
import {GameService} from "./GameService";
import {ResourcesService} from "./ResourcesService";

// názvy servis z třídy SegnalSerice (bude jich více)
// zatím neřešit
type signalServices = 'game-signal' | 'chat-signal';

export const initServices = () => {
    const resource_service = new ResourcesService();
    const game_service = new GameService(null);
    const food_service = new FoodService();

    return {resource_service, game_service, food_service};
};