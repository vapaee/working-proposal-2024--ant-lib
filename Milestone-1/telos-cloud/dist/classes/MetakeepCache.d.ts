export interface MetakeepCacheData {
    [email: string]: {
        wallet: MetakeepWallets;
        chains: {
            [chainId: string]: {
                accounts: string[];
            };
        };
    };
}
export interface MetakeepWallets {
    eosAddress: string;
    solAddress: string;
    ethAddress: string;
}
declare class MetakeepCache {
    private cache;
    private logged;
    mails: string[];
    constructor();
    loadCache(): void;
    saveCache(): void;
    private assertCache;
    getMails(): string[];
    getEosAddress(email: string): string;
    getSolAddress(email: string): string;
    getEthAddress(email: string): string;
    getAccountNames(email: string, chainId: string): string[];
    getLogged(): string | null;
    setSelectedAccountName(email: string, chainId: string, accountName: string): void;
    addAccountName(email: string, chainId: string, accountName: string): void;
    addCredentials(email: string, wallet: MetakeepWallets): void;
    setLogged(email: string | null): void;
}
export declare const metakeepCache: MetakeepCache;
export {};
