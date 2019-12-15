// třída service manager
export class BasicServiceManager {
    private singletons: any = {};

    // přidat service
    // type -> nazev podle ktereho bude ulozen
    // instance servisi
    addService(type: string, service: any) {
        this.singletons[type] = service;
    }

    // získat service
    // type -> nazev podle ktereho je ulozen
    getService(type: string) {
        return this.singletons[type];
    }
}