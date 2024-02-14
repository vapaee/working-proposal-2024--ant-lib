import { TelosCloudOptions, version } from '..';
import { telosCloud } from './TelosCloudInstance'; 

export class TelosCloud {
    
    constructor(config: TelosCloudOptions) {
        console.log("TelosCloud.constructor()");
        telosCloud.init(config);
    }

    get version () {
        console.log("TelosCloud.version");
        return version;
    }

    get userAccount() {
        console.log("TelosCloud.userAccount");
        return telosCloud.userAccount;
    }

    get pubKeys() {
        console.log("TelosCloud.pubKeys");
        return telosCloud.pubKeys;
    }

    checkAutoLogin() {
        console.log("TelosCloud.checkAutoLogin()");
        telosCloud.checkAutoLogin();
    }

    // async login(): Promise<string> {
    //     return telosCloud.login();
    // }

    reset() {
        console.log("TelosCloud.reset()");
        telosCloud.reset();
    }

    async logout(): Promise<void> {
        return telosCloud.logout();
    }

    get api() {
        return telosCloud.api;
    }

    get events() {
        return telosCloud.events;
    }
}
