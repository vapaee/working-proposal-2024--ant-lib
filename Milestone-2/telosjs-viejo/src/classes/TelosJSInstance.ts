import { LoginModal } from "./LoginModal";
import { googleCtrl } from "./GoogleOneTap";
import { TelosJSOptions } from "../types";
import { GoogleCredentials, version } from "..";
import { Subscription } from "rxjs";

export class TelosJSInstance {
    private modal: LoginModal;
    googleSubscription: Subscription | null = null;
    
    constructor() {
        this.modal = new LoginModal();
        this.googleSubscription = googleCtrl.onSuccessfulLogin.subscribe({
            next: (data) => {
                if (data) {
                    this.performTelosCloudLogin(data);
                }
            },
        });
    }

    init(config: TelosJSOptions) {
        googleCtrl.init(config.googleAppId);
    }

    destroy() {
        this.googleSubscription?.unsubscribe();
        this.modal.destroy();
    }

    performTelosCloudLogin(data: GoogleCredentials) {
        console.log("TelosJS.performTelosCloudLogin() chain: ", this.modal.chainSelected, "data:", data);
        throw new Error("Method not implemented.");
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
        this.modal.show();
        return new Promise((resolve) => {
        });
    }

    async logout(): Promise<void> {
        console.log("TelosJS.logout()");
    }

    get api() {
        return {
            transact: async (trx:any) => {
                console.log("TelosJS.api.transact()", trx);
                return {
                    transaction_id: "1234567890",
                };
            }
        };
    }
}


export const telosJs = new TelosJSInstance();