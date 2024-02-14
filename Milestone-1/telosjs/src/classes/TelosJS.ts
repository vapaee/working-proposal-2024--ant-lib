import { TelosJSOptions, version } from '..';
import { telosJs } from './TelosJSInstance'; 

export class TelosJS {
    
    constructor(config: TelosJSOptions) {
        console.log("TelosJS.constructor()");
        telosJs.init(config);
    }

    get version () {
        console.log("TelosJS.version");
        return version;
    }

    get userAccount() {
        console.log("TelosJS.userAccount");
        return "3m1q4.wam";
    }

    get pubKeys() {
        console.log("TelosJS.pubKeys");
        return [
            "EOS6rjGKGYPBmVGsDDFAbM6UT5wQ9szB9m2fEcqHFMMcPge983xz9",
            "EOS7wTCoctybwrQWuE2tWYGwdLEGRXE9rrzALeBLUhWfbHXysFr9W",
        ];
    }

    async isAutoLoginAvailable(): Promise<boolean>{
        console.log("TelosJS.isAutoLoginAvailable()");
        return false;
    }

    async login(): Promise<string> {
        return telosJs.login();
    }

    async logout(): Promise<void> {
        return telosJs.logout();
    }

    get api() {
        return telosJs.api;
    }
}
