import {initServices} from "./services/ServicesModule";
import {BasicServiceManager} from "./services/BasicServiceManager";

export const bootstrap = (() => {
    const serviceManager = new BasicServiceManager();
    initServices(serviceManager);
});