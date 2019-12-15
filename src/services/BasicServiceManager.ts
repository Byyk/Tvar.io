export class BasicServiceManager {
    singletons: any = {};

    addService(type: string, service: any) {
        this.singletons[type] = service;
    }

    getService(type: string) {
        return this.singletons[type];
    }
}