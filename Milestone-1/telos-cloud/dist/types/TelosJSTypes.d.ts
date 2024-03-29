export interface TelosCloudOptions {
    appName: string;
    chain: {
        chainId: string;
        rpcEndpoint: string;
    };
    fuel: {
        rpcEndpoint: string;
        hyperionEndpoint: string;
    };
    metakeep: {
        appId: string;
        accountCreateAPI?: string;
    };
    googleOneTap: {
        appId: string;
        buttonId?: string;
        config?: {
            theme: string;
            size: string;
        };
    };
    accountCreation?: {
        rpcEndpoint?: string;
        clientId?: string;
        allowRedirect?: boolean;
    };
}
export interface TelosCloudLoggedUser {
    account: string;
    permission: string;
    email: string;
    keys: string[];
}
