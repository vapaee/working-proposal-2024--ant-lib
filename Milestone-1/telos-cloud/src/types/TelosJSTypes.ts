export interface TelosCloudOptions {
    appName: string,
    chain: {
        chainId: string,
        rpcEndpoint: string,
    },
    fuel: {
        rpcEndpoint: string,
        hyperionEndpoint: string,
    },
    metakeep: {
        appId: string,
        accountCreateAPI?: string,
    },
    googleOneTap: {
        appId: string,
        buttonId?: string,
        config?: { theme: string, size: string },
    },
    // accountCreation: {
    //     // rpcEndpoint: 'https://mainnet.telos.net', // your own rpc endpoint
    //     // clientId: 'your-client-id', // your own client id registered in our service whitelist
    //     allowRedirect: true,
    // }
    accountCreation?: {
        // your own rpc endpoint
        rpcEndpoint?: string, 

        // your own client id registered in our service whitelist
        clientId?: string, 

        // if allowRedirect, the user will be redirected to the account creation page if the account does not exist
        // after the account is created, the user will be redirected back to the original page and autologin will be performed
        allowRedirect?: boolean, 
    }
}

export interface TelosCloudLoggedUser {
    account: string;
    permission: string;
    email: string;
    keys: string[];
}

