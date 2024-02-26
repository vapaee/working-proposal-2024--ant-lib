import { googleCtrl } from './GoogleOneTap';
import { TelosCloudLoggedUser, TelosCloudOptions } from '../types';
import { GoogleCredentials, version } from '..';
import { Subject, Subscription } from 'rxjs';
import { MetakeepAuthenticator } from './MetakeepUAL';
import { initFuelUserWrapper } from './GraymassFuel';
// import { User } from './ual';
import { User } from 'universal-authenticator-library';

const TELOS_CLOUD_LOGGED_USER = 'telos-cloud.logged';

export class TelosCloudInstance {
    googleSubscription: Subscription | null = null;
    onLogin = new Subject<void>();
    onLogout = new Subject<void>();
    auth: MetakeepAuthenticator | null = null;
    config: TelosCloudOptions | null = null;
    user: User | null = null;
    logged: TelosCloudLoggedUser | null = null;
    
    constructor() {
        console.log('TelosCloudInstance.constructor()');
        this.googleSubscription = googleCtrl.onSuccessfulLogin.subscribe({
            next: (data) => {
                if (data) {
                    this.performTelosCloudLogin(data);
                }
            },
        });
    }

    init(config: TelosCloudOptions) {
        console.log('TelosCloudInstance.init()', config);
        this.config = config;
        googleCtrl.init(config.googleOneTap.appId);
        googleCtrl.renderButton(config.googleOneTap.buttonId);

        const url = config.chain.rpcEndpoint;
        const protocol = url.split('://')[0];
        const host = url.split('://')[1].split(':')[0];
        const port = parseInt(url.split('://')[1].split(':')[1] || (protocol === 'https' ? '443' : '80'));

        const chain = {
            chainId: config.chain.chainId,
            rpcEndpoints: [
                { protocol, host, port },
            ],
        };

        this.auth = new MetakeepAuthenticator([chain], {
            appName: config.appName,
            appId: config.metakeep.appId,
            accountCreateAPI: config.metakeep.accountCreateAPI,
        });
    }

    reset() {
        console.log('TelosCloudInstance.reset()');
        this.init(this.config as TelosCloudOptions);
    }

    // get network() {
    //     switch (this.config?.chain.chainId) {
    //         // 4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11 -> mainnet
    // }

    performTelosCloudLogin(data: GoogleCredentials) {
        console.log('TelosCloudInstance.performTelosCloudLogin() data:', data);
        this.setMetakeepZero(data);
    }

    async saveLoggedUser() {
        console.log('TelosCloudInstance.saveLoggedUser()');
        if (this.logged) {
            localStorage.setItem(TELOS_CLOUD_LOGGED_USER, JSON.stringify(this.logged));
        } else {
            localStorage.removeItem(TELOS_CLOUD_LOGGED_USER);
        }
    }

    async checkAutoLogin() {
        console.log('TelosCloudInstance.checkAutoLogin()');
        const data = localStorage.getItem(TELOS_CLOUD_LOGGED_USER);
        console.log('TelosCloudInstance.checkAutoLogin() data:', data, this.logged);
        if (!this.logged && data) {
            this.logged = JSON.parse(data);
            if (this.logged) {
                const credentials = {
                    email: this.logged.email,
                    jwt: '',
                }
                this.performTelosCloudLogin(credentials);
            }
        }
    }

    async setMetakeepZero(credentials:GoogleCredentials){
        console.log('TelosCloudInstance.setMetakeepZero()', credentials);
        if (this.auth) {
            this.auth.setUserCredentials(credentials);
            // this are steps from accounts store loginZero()
            await this.auth.init();
            const ualUsers = await this.auth.login();
            if (ualUsers?.length) {
                const useFuel = this.config?.fuel;
                const user = useFuel ? await initFuelUserWrapper(ualUsers[0], useFuel) : ualUsers[0];
                if (user) {
                    this.user = user
                    const permission = (this.user as unknown as { requestPermission: string })
                    .requestPermission ?? 'active';
                    const account = await this.user.getAccountName();
                    const email= credentials.email;
                    const keys = await this.user.getKeys();
                    this.logged = {
                        account,
                        permission,
                        email,
                        keys,
                    };
                    this.saveLoggedUser();
                    this.onLogin.next();
                }
            } else {
                throw new Error('MetakeepAuthenticator login failed');
            }
        } else {
            throw new Error('MetakeepAuthenticator not initialized');
        }
    };

    get version () {
        console.log('TelosCloudInstance.version');
        return version;
    }

    get userAccount() {
        console.log('TelosCloudInstance.userAccount');
        return this.logged?.account ?? '';
    }

    get pubKeys() {
        console.log('TelosCloudInstance.pubKeys');
        return (this.logged?.keys ?? []) as string[];
    }

    get events() {
        return {
            onLogin: this.onLogin,
            onLogout: this.onLogout,
        };
    }

    async isAutoLoginAvailable(): Promise<boolean>{
        console.log('TelosCloudInstance.isAutoLoginAvailable()');
        return false;
    }

    // async login(): Promise<string> {
    //     return new Promise((resolve) => {
    //         this.onLogin.next(); // LOGIN
    //     });
    // }

    async logout(): Promise<void> {
        console.log('TelosCloudInstance.logout()');
        this.logged = null;
        this.saveLoggedUser();
        this.onLogout.next(); // LOGOUT
    }

    get api() {
        return {
            transact: async (trx:any) => {
                console.log('TelosCloudInstance.api.transact()', trx);
                if (this.user) {
                    return this.user.signTransaction(trx, { broadcast: true }).then((result) => {
                        return ({ ...result, transaction_id: result.transactionId });
                    });
                } else {
                    throw new Error('User not logged in');
                }
            }
        };
    }
}


export const telosCloud = new TelosCloudInstance();