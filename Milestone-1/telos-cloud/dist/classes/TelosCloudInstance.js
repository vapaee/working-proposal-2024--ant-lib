"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.telosCloud = exports.TelosCloudInstance = void 0;
const GoogleOneTap_1 = require("./GoogleOneTap");
const __1 = require("..");
const rxjs_1 = require("rxjs");
const MetakeepUAL_1 = require("./MetakeepUAL");
const GraymassFuel_1 = require("./GraymassFuel");
const TELOS_CLOUD_LOGGED_USER = 'telos-cloud.logged';
class TelosCloudInstance {
    constructor() {
        this.googleSubscription = null;
        this.onLogin = new rxjs_1.Subject();
        this.onLogout = new rxjs_1.Subject();
        this.auth = null;
        this.config = null;
        this.user = null;
        this.logged = null;
        console.log('TelosCloudInstance.constructor()', this.version);
        this.googleSubscription = GoogleOneTap_1.googleCtrl.onSuccessfulLogin.subscribe({
            next: (data) => {
                if (data) {
                    this.performTelosCloudLogin(data);
                }
            },
        });
    }
    init(config) {
        var _a;
        console.log('TelosCloudInstance.init()', config);
        this.config = config;
        GoogleOneTap_1.googleCtrl.init(config.googleOneTap.appId);
        GoogleOneTap_1.googleCtrl.renderButton(config.googleOneTap.buttonId);
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
        this.auth = new MetakeepUAL_1.MetakeepAuthenticator([chain], {
            appName: config.appName,
            appId: config.metakeep.appId,
            accountCreateAPI: (_a = config.accountCreation) === null || _a === void 0 ? void 0 : _a.rpcEndpoint,
        });
        if (config.accountCreation && config.accountCreation.allowRedirect) {
            this.auth.setAccountCreateCallback(() => {
                return new Promise(() => {
                    // save a partial state of logged
                    this.logged = {
                        account: '',
                        permission: '',
                        email: '',
                        keys: [],
                    };
                    this.saveLoggedUser();
                    // we redirect the user to the login page
                    const current_url = window.location.href;
                    window.open(`https://deploy-preview-782--wallet-develop-mainnet.netlify.app/?redirect=${current_url}`, '_self');
                });
            });
        }
    }
    reset() {
        console.log('TelosCloudInstance.reset()');
        this.init(this.config);
    }
    performTelosCloudLogin(data) {
        console.log('TelosCloudInstance.performTelosCloudLogin() data:', data);
        this.setMetakeepZero(data);
    }
    saveLoggedUser() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TelosCloudInstance.saveLoggedUser()');
            if (this.logged) {
                localStorage.setItem(TELOS_CLOUD_LOGGED_USER, JSON.stringify(this.logged));
            }
            else {
                localStorage.removeItem(TELOS_CLOUD_LOGGED_USER);
            }
        });
    }
    checkAutoLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TelosCloudInstance.checkAutoLogin()');
            const data = localStorage.getItem(TELOS_CLOUD_LOGGED_USER);
            console.log('TelosCloudInstance.checkAutoLogin() data:', data, this.logged);
            if (!this.logged && data) {
                this.logged = JSON.parse(data);
            }
            const url = new URL(window.location.href);
            const account = url.searchParams.get('account');
            const email = url.searchParams.get('email');
            if (account && email) {
                this.logged = {
                    account,
                    email,
                    permission: 'active',
                    keys: [],
                };
                this.saveLoggedUser();
            }
            if (this.logged) {
                if (this.logged.email && this.logged.account) {
                    const credentials = {
                        email: this.logged.email,
                        jwt: '',
                        account: this.logged.account,
                    };
                    this.performTelosCloudLogin(credentials);
                }
            }
        });
    }
    setMetakeepZero(credentials) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TelosCloudInstance.setMetakeepZero()', credentials);
            if (this.auth) {
                this.auth.setUserCredentials(credentials);
                // this are steps from accounts store loginZero()
                yield this.auth.init();
                const ualUsers = yield this.auth.login();
                if (ualUsers === null || ualUsers === void 0 ? void 0 : ualUsers.length) {
                    const useFuel = (_a = this.config) === null || _a === void 0 ? void 0 : _a.fuel;
                    const user = useFuel ? yield (0, GraymassFuel_1.initFuelUserWrapper)(ualUsers[0], useFuel) : ualUsers[0];
                    if (user) {
                        this.user = user;
                        const permission = (_b = this.user
                            .requestPermission) !== null && _b !== void 0 ? _b : 'active';
                        const account = yield this.user.getAccountName();
                        const email = credentials.email;
                        const keys = yield this.user.getKeys();
                        this.logged = {
                            account,
                            permission,
                            email,
                            keys,
                        };
                        this.saveLoggedUser();
                        this.onLogin.next();
                    }
                }
                else {
                    throw new Error('MetakeepAuthenticator login failed');
                }
            }
            else {
                throw new Error('MetakeepAuthenticator not initialized');
            }
        });
    }
    ;
    get version() {
        console.log('TelosCloudInstance.version');
        return __1.version;
    }
    get userAccount() {
        var _a, _b;
        console.log('TelosCloudInstance.userAccount');
        return (_b = (_a = this.logged) === null || _a === void 0 ? void 0 : _a.account) !== null && _b !== void 0 ? _b : '';
    }
    get pubKeys() {
        var _a, _b;
        console.log('TelosCloudInstance.pubKeys');
        return ((_b = (_a = this.logged) === null || _a === void 0 ? void 0 : _a.keys) !== null && _b !== void 0 ? _b : []);
    }
    get events() {
        return {
            onLogin: this.onLogin,
            onLogout: this.onLogout,
        };
    }
    isAutoLoginAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TelosCloudInstance.isAutoLoginAvailable()');
            return false;
        });
    }
    // async login(): Promise<string> {
    //     return new Promise((resolve) => {
    //         this.onLogin.next(); // LOGIN
    //     });
    // }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TelosCloudInstance.logout()');
            this.logged = null;
            this.saveLoggedUser();
            this.onLogout.next(); // LOGOUT
        });
    }
    get api() {
        return {
            transact: (trx) => __awaiter(this, void 0, void 0, function* () {
                console.log('TelosCloudInstance.api.transact()', trx);
                if (this.user) {
                    return this.user.signTransaction(trx, { broadcast: true }).then((result) => {
                        return (Object.assign(Object.assign({}, result), { transaction_id: result.transactionId }));
                    });
                }
                else {
                    throw new Error('User not logged in');
                }
            })
        };
    }
}
exports.TelosCloudInstance = TelosCloudInstance;
exports.telosCloud = new TelosCloudInstance();
//# sourceMappingURL=TelosCloudInstance.js.map