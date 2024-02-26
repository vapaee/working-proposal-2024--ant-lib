"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metakeepCache = void 0;
const LOCAL_STORAGE_KEY_DATA = 'metakeep.data';
const LOCAL_STORAGE_KEY_LOGGED = 'metakeep.logged';
class MetakeepCache {
    constructor() {
        this.cache = {};
        this.logged = null;
        this.mails = [];
        this.loadCache();
    }
    loadCache() {
        try {
            const cachedData = window.localStorage.getItem(LOCAL_STORAGE_KEY_DATA);
            if (cachedData) {
                this.cache = JSON.parse(cachedData);
            }
            this.logged = window.localStorage.getItem(LOCAL_STORAGE_KEY_LOGGED);
            this.mails = Object.keys(this.cache);
        }
        catch (error) {
            console.error('Error loading Metakeep cache:', error);
        }
    }
    saveCache() {
        try {
            window.localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(this.cache));
            if (this.logged) {
                window.localStorage.setItem(LOCAL_STORAGE_KEY_LOGGED, this.logged);
            }
            else {
                window.localStorage.removeItem(LOCAL_STORAGE_KEY_LOGGED);
            }
        }
        catch (error) {
            console.error('Error saving Metakeep cache:', error);
        }
    }
    assertCache(email, chainId) {
        if (!this.cache[email]) {
            this.cache[email] = {
                wallet: {
                    eosAddress: '',
                    solAddress: '',
                    ethAddress: '',
                },
                chains: {},
            };
        }
        if (chainId) {
            if (!this.cache[email].chains[chainId]) {
                this.cache[email].chains[chainId] = {
                    accounts: [],
                };
            }
        }
    }
    getMails() {
        return Object.keys(this.cache);
    }
    getEosAddress(email) {
        var _a, _b, _c;
        this.assertCache(email);
        return (_c = (_b = (_a = this.cache[email]) === null || _a === void 0 ? void 0 : _a.wallet) === null || _b === void 0 ? void 0 : _b.eosAddress) !== null && _c !== void 0 ? _c : '';
    }
    getSolAddress(email) {
        var _a, _b, _c;
        this.assertCache(email);
        return (_c = (_b = (_a = this.cache[email]) === null || _a === void 0 ? void 0 : _a.wallet) === null || _b === void 0 ? void 0 : _b.solAddress) !== null && _c !== void 0 ? _c : '';
    }
    getEthAddress(email) {
        var _a, _b, _c;
        this.assertCache(email);
        return (_c = (_b = (_a = this.cache[email]) === null || _a === void 0 ? void 0 : _a.wallet) === null || _b === void 0 ? void 0 : _b.ethAddress) !== null && _c !== void 0 ? _c : '';
    }
    getAccountNames(email, chainId) {
        var _a, _b, _c;
        this.assertCache(email, chainId);
        return (_c = (_b = (_a = this.cache[email]) === null || _a === void 0 ? void 0 : _a.chains[chainId]) === null || _b === void 0 ? void 0 : _b.accounts) !== null && _c !== void 0 ? _c : [];
    }
    getLogged() {
        return this.logged;
    }
    // setters --------------
    setSelectedAccountName(email, chainId, accountName) {
        this.assertCache(email, chainId);
        const index = this.cache[email].chains[chainId].accounts.indexOf(accountName);
        if (index !== -1) {
            this.cache[email].chains[chainId].accounts.splice(index, 1);
        }
        this.cache[email].chains[chainId].accounts.unshift(accountName);
        this.saveCache();
    }
    addAccountName(email, chainId, accountName) {
        this.assertCache(email, chainId);
        if (!this.cache[email].chains[chainId].accounts.includes(accountName)) {
            this.cache[email].chains[chainId].accounts.push(accountName);
        }
        this.saveCache();
    }
    addCredentials(email, wallet) {
        this.assertCache(email);
        this.cache[email].wallet = wallet;
        this.saveCache();
    }
    setLogged(email) {
        if (email) {
            this.assertCache(email);
        }
        this.logged = email;
        this.saveCache();
    }
}
exports.metakeepCache = new MetakeepCache();
//# sourceMappingURL=MetakeepCache.js.map