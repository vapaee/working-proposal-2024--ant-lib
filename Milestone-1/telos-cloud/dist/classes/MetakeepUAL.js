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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetakeepAuthenticator = exports.Authenticator = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const universal_authenticator_library_1 = require("universal-authenticator-library");
const metakeep_1 = require("metakeep");
const axios_1 = __importDefault(require("axios"));
const eosio_1 = require("@greymass/eosio");
const MetakeepCache_1 = require("./MetakeepCache");
// import { User } from './ual';
const universal_authenticator_library_2 = require("universal-authenticator-library");
let metakeep = null;
const metakeep_name = 'metakeep.ual';
const metakeepDefaultAccountSelector = {
    selectAccount: (accounts) => Promise.resolve(accounts[0]),
};
const metakeepDefaultAccountNameSelector = {
    selectAccountName: () => Promise.resolve(''),
};
// ------------------------------------------------------
class Authenticator {
    constructor(chains, options) {
        this.chains = chains;
        this.options = options;
        this.defaultInvalidateAfter = 604800;
    }
    shouldInvalidateAfter() {
        return this.defaultInvalidateAfter;
    }
}
exports.Authenticator = Authenticator;
// ------------------------------------------------------
class MetakeepAuthenticator extends Authenticator {
    constructor(chains, options) {
        var _a;
        super(chains, options);
        this.loading = false;
        this.userCredentials = { email: '', jwt: '' };
        this.accountSelector = metakeepDefaultAccountSelector;
        this.accountNameSelector = metakeepDefaultAccountNameSelector;
        /**
         * Login using the Authenticator App. This can return one or more users depending on multiple chain support.
         *
         * @param accountName    The account name of the user for Authenticators that do not store accounts (optional)
         */
        this.login = () => __awaiter(this, void 0, void 0, function* () {
            console.log('MetakeepAuthenticator.login()');
            if (this.userCredentials.email === '') {
                throw new Error('No account email');
            }
            this.loading = true;
            metakeep = new metakeep_1.MetaKeep({
                // App id to configure UI
                appId: this.appId,
                // Signed in user's email address
                user: {
                    email: this.userCredentials.email,
                },
            });
            const accountName = yield this.resolveAccountName();
            console.log('MetakeepAuthenticator.login() -> accountName', accountName);
            const publicKey = MetakeepCache_1.metakeepCache.getEosAddress(this.userCredentials.email);
            try {
                const permission = 'active';
                this.loading = false;
                console.log('MetakeepAuthenticator.login() -> new MetakeepUser()');
                const userInstance = new MetakeepUser({
                    accountName,
                    permission,
                    publicKey,
                    chainId: this.chainId,
                    endpoint: this.endpoint,
                });
                return [userInstance];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (err) {
                this.loading = false;
                throw new universal_authenticator_library_1.UALError(err.messsage, universal_authenticator_library_1.UALErrorType.Login, err, 'MetakeepAuthenticator');
            }
        });
        /**
         * Logs the user out of the dapp. This will be strongly dependent on each
         * Authenticator app's patterns.
         */
        this.logout = () => __awaiter(this, void 0, void 0, function* () {
            MetakeepCache_1.metakeepCache.setLogged(null);
            return;
        });
        console.log('MetakeepAuthenticator.constructor()');
        this.chainId = chains[0].chainId;
        const [chain] = chains;
        const [rpc] = chain.rpcEndpoints;
        this.endpoint = `${rpc.protocol}://${rpc.host}:${rpc.port}`;
        if (!(options === null || options === void 0 ? void 0 : options.appId)) {
            throw new Error('MetakeepAuthenticator: Missing appId');
        }
        this.appId = options.appId;
        this.accountCreateAPI = options.accountCreateAPI;
        this.chains = chains;
        this.userCredentials = {
            email: (_a = MetakeepCache_1.metakeepCache.getLogged()) !== null && _a !== void 0 ? _a : '',
            jwt: '',
        };
    }
    resetAccountSelector() {
        this.accountSelector = metakeepDefaultAccountSelector;
    }
    setAccountSelector(accountSelector) {
        this.accountSelector = accountSelector;
    }
    setAccountNameSelector(accountNameSelector) {
        this.accountNameSelector = accountNameSelector;
    }
    saveCache() {
        MetakeepCache_1.metakeepCache.saveCache();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //
        });
    }
    setUserCredentials(credentials) {
        console.log('MetakeepAuthenticator.setUserCredentials()', credentials);
        this.userCredentials = credentials;
        MetakeepCache_1.metakeepCache.setLogged(credentials.email);
    }
    /**
     * Resets the authenticator to its initial, default state then calls init method
     */
    reset() {
        this.init();
    }
    /**
     * Returns true if the authenticator has errored while initializing.
     */
    isErrored() {
        return false;
    }
    getName() {
        return metakeep_name;
    }
    /**
     * Returns a URL where the user can download and install the underlying authenticator
     * if it is not found by the UAL Authenticator.
     */
    getOnboardingLink() {
        return '';
    }
    /**
     * Returns error (if available) if the authenticator has errored while initializing.
     */
    getError() {
        return null;
    }
    /**
     * Returns true if the authenticator is loading while initializing its internal state.
     */
    isLoading() {
        return this.loading;
    }
    /**
     * Returns the style of the Button that will be rendered.
     */
    getStyle() {
        return {
            // An icon displayed to app users when selecting their authentication method
            icon: 'no-icon',
            // Name displayed to app users
            text: metakeep_name,
            // Background color displayed to app users who select your authenticator
            background: '#030238',
            // Color of text used on top the `backgound` property above
            textColor: '#FFFFFF',
        };
    }
    /**
     * Returns whether or not the button should render based on the operating environment and other factors.
     * ie. If your Authenticator App does not support mobile, it returns false when running in a mobile browser.
     */
    shouldRender() {
        return true;
    }
    /**
     * Returns whether or not the dapp should attempt to auto login with the Authenticator app.
     * Auto login will only occur when there is only one Authenticator that returns shouldRender() true and
     * shouldAutoLogin() true.
     */
    shouldAutoLogin() {
        return true;
    }
    /**
     * Returns whether or not the button should show an account name input field.
     * This is for Authenticators that do not have a concept of account names.
     */
    shouldRequestAccountName() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    createAccount(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('MetakeepAuthenticator.createAccount()');
            const suggestedName = yield this.accountNameSelector.selectAccountName();
            if (!this.accountCreateAPI) {
                throw new Error('accountCreateAPI');
            }
            return axios_1.default.post(this.accountCreateAPI, {
                ownerKey: publicKey,
                activeKey: publicKey,
                jwt: this.userCredentials.jwt,
                suggestedName: suggestedName,
            }).then(response => response.data.accountName);
        });
    }
    resolveAccountName() {
        console.log('MetakeepAuthenticator.resolveAccountName()');
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log('MetakeepAuthenticator.resolveAccountName() start:');
            let accountName = '';
            if (!metakeep) {
                console.error('MetakeepAuthenticator.resolveAccountName() metakeep is not initialized');
                return reject(new Error('metakeep is not initialized'));
            }
            if (this.userCredentials.email === '') {
                console.error('MetakeepAuthenticator.resolveAccountName() No account email');
                return reject(new Error('No account email'));
            }
            // we check if we have the account name in the cache
            console.log('MetakeepAuthenticator.resolveAccountName() check point 1');
            const accountNames = MetakeepCache_1.metakeepCache.getAccountNames(this.userCredentials.email, this.chainId);
            console.log('MetakeepAuthenticator.resolveAccountName() accountNames', accountNames);
            if (accountNames.length > 0) {
                if (accountNames.length > 1) {
                    // if we have more than one account, we ask the user to select one using this callback
                    const selectedAccount = yield this.accountSelector.selectAccount(accountNames);
                    this.resetAccountSelector();
                    MetakeepCache_1.metakeepCache.setSelectedAccountName(this.userCredentials.email, this.chainId, selectedAccount);
                    return resolve(selectedAccount);
                }
                else {
                    return resolve(accountNames[0]);
                }
            }
            // if not, we fetch all the accounts for the email
            const credentials = yield metakeep.getWallet();
            const publicKey = credentials.wallet.eosAddress;
            MetakeepCache_1.metakeepCache.addCredentials(this.userCredentials.email, credentials.wallet);
            console.log('MetakeepAuthenticator.resolveAccountName() credentials', credentials);
            console.log('MetakeepAuthenticator.resolveAccountName() this.endpoint', this.endpoint);
            try {
                // we try to get the account name from the public key
                const response = yield axios_1.default.post(`${this.endpoint}/v1/history/get_key_accounts`, {
                    public_key: publicKey,
                });
                const accountExists = ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.account_names.length) > 0;
                let names = [];
                console.log('MetakeepAuthenticator.resolveAccountName() response?.data?.account_names', (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.account_names);
                console.log('MetakeepAuthenticator.resolveAccountName() accountExists', accountExists);
                if (accountExists) {
                    names = response.data.account_names;
                    names.forEach(name => MetakeepCache_1.metakeepCache.addAccountName(this.userCredentials.email, this.chainId, name));
                    console.log('MetakeepAuthenticator.resolveAccountName() names', names);
                    if (names.length > 1) {
                        // if we have more than one account, we ask the user to select one using this callback
                        accountName = yield this.accountSelector.selectAccount(names);
                        this.resetAccountSelector();
                    }
                    else {
                        accountName = names[0];
                    }
                    console.log('MetakeepAuthenticator.resolveAccountName() accountName', accountName);
                    MetakeepCache_1.metakeepCache.setSelectedAccountName(this.userCredentials.email, this.chainId, accountName);
                }
                else {
                    accountName = yield this.createAccount(publicKey);
                    MetakeepCache_1.metakeepCache.addAccountName(this.userCredentials.email, this.chainId, accountName);
                    names = [accountName];
                }
                this.saveCache();
                return resolve(accountName);
            }
            catch (error) {
                console.error('error', error);
                throw new Error('Error getting account name');
            }
        }));
    }
    /**
     * Returns true if user confirmation is required for `getKeys`
     */
    requiresGetKeyConfirmation() {
        return false;
    }
}
exports.MetakeepAuthenticator = MetakeepAuthenticator;
// ------------------------------------------------------
class MetakeepUser extends universal_authenticator_library_2.User {
    constructor({ accountName, permission, publicKey, chainId, endpoint, }) {
        super();
        /**
        * @param transaction    The transaction to be signed (a object that matches the RpcAPI structure).
        */
        this.signTransaction = (originalTransaction, options = {}) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            console.log('MetakeepUser.signTransaction()', originalTransaction, options);
            if (!metakeep) {
                throw new Error('metakeep is not initialized');
            }
            try {
                // expire time in seconds
                const expireSeconds = 120;
                // Retrieve transaction headers
                const info = yield this.eosioCore.v1.chain.get_info();
                const header = info.getTransactionHeader(expireSeconds);
                // collect all contract abis
                const abi_promises = originalTransaction.actions.map((a) => this.eosioCore.v1.chain.get_abi(a.account));
                const responses = yield Promise.all(abi_promises);
                const abis = responses.map(x => x.abi);
                const abis_and_names = originalTransaction.actions.map((x, i) => ({
                    contract: x.account,
                    abi: abis[i],
                }));
                // create complete well formed transaction
                const transaction = eosio_1.Transaction.from(Object.assign(Object.assign({}, header), { actions: originalTransaction.actions }), abis_and_names);
                const transaction_extensions = (_a = originalTransaction.transaction_extensions) !== null && _a !== void 0 ? _a : [];
                const context_free_actions = (_b = originalTransaction.context_free_actions) !== null && _b !== void 0 ? _b : [];
                const delay_sec = (_c = originalTransaction.delay_sec) !== null && _c !== void 0 ? _c : 0;
                const max_cpu_usage_ms = (_d = originalTransaction.max_cpu_usage_ms) !== null && _d !== void 0 ? _d : 0;
                const max_net_usage_words = (_e = originalTransaction.max_net_usage_words) !== null && _e !== void 0 ? _e : 0;
                const expiration = (_f = originalTransaction.expiration) !== null && _f !== void 0 ? _f : transaction.expiration.toString();
                const ref_block_num = (_g = originalTransaction.ref_block_num) !== null && _g !== void 0 ? _g : transaction.ref_block_num.toNumber();
                const ref_block_prefix = (_h = originalTransaction.ref_block_prefix) !== null && _h !== void 0 ? _h : transaction.ref_block_prefix.toNumber();
                // convert actions to JSON
                const actions = transaction.actions.map(a => ({
                    account: a.account.toJSON(),
                    name: a.name.toJSON(),
                    authorization: a.authorization.map((x) => ({
                        actor: x.actor.toJSON(),
                        permission: x.permission.toJSON(),
                    })),
                    data: a.data.toJSON(),
                }));
                // compose the complete transaction
                const complete_transaction = {
                    rawTransaction: {
                        expiration,
                        ref_block_num,
                        ref_block_prefix,
                        max_net_usage_words,
                        max_cpu_usage_ms,
                        delay_sec,
                        context_free_actions,
                        actions,
                        transaction_extensions,
                    },
                    extraSigningData: {
                        chainId: this.chainId,
                    },
                };
                // sign the transaction with metakeep
                const reason = this.reasonCallback ? this.reasonCallback(originalTransaction) : 'sign this transaction';
                const response = yield metakeep.signTransaction(complete_transaction, reason);
                const signature = response.signature;
                // Pack the transaction for transport
                const packedTransaction = eosio_1.PackedTransaction.from({
                    signatures: [signature],
                    packed_context_free_data: '',
                    packed_trx: eosio_1.Serializer.encode({ object: transaction }),
                });
                if (options.broadcast === false) {
                    return Promise.resolve({
                        wasBroadcast: false,
                        transactionId: '',
                        status: '',
                        transaction: packedTransaction,
                    });
                }
                // Broadcast the signed transaction to the blockchain
                const pushResponse = yield this.eosioCore.v1.chain.push_transaction(packedTransaction);
                // we compose the final response
                const finalResponse /*: SignTransactionResponse*/ = {
                    wasBroadcast: true,
                    transactionId: pushResponse.transaction_id,
                    status: pushResponse.processed.receipt.status,
                    transaction: packedTransaction,
                };
                return Promise.resolve(finalResponse);
            }
            catch (e) {
                throw this.handleCatchError(e);
            }
        });
        /**
         * Note: this method is not implemented yet
         *
         * @param publicKey     The public key to use for signing.
         * @param data                The data to be signed.
         * @param helpText        Help text to explain the need for arbitrary data to be signed.
         *
         * @returns                     The signature
         */
        this.signArbitrary = () => __awaiter(this, void 0, void 0, function* () {
            throw new Error('MetakeepUAL: signArbitrary not supported (yet)');
        });
        this.getAccountName = () => __awaiter(this, void 0, void 0, function* () { return this.accountName; });
        this.getAccountPermission = () => __awaiter(this, void 0, void 0, function* () { return this.permission; });
        this.getChainId = () => __awaiter(this, void 0, void 0, function* () { return this.chainId; });
        this.getKeys = () => __awaiter(this, void 0, void 0, function* () { return this.keys; });
        console.log('MetakeepUser.constructor()');
        this.keys = [publicKey];
        this.accountName = accountName;
        this.permission = permission;
        this.chainId = chainId;
        this.eosioCore = new eosio_1.APIClient({ url: endpoint });
        console.log('MetakeepUser.constructor() end');
    }
    setReasonCallback(callback) {
        this.reasonCallback = callback;
    }
    handleCatchError(error) {
        if (error.status === 'USER_REQUEST_DENIED') {
            return new Error('antelope.evm.error_transaction_canceled');
        }
        else {
            return new Error('antelope.evm.error_send_transaction');
        }
    }
    /**
     * @param challenge     Challenge text sent to the authenticator.
     *
     * @returns                     Whether the user owns the private keys corresponding with provided public keys.
     */
    verifyKeyOwnership() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
//# sourceMappingURL=MetakeepUAL.js.map