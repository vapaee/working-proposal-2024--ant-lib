import { TelosCloudOptions } from '..';
export declare class TelosCloud {
    constructor(config: TelosCloudOptions);
    get version(): string;
    get userAccount(): string;
    get pubKeys(): string[];
    checkAutoLogin(): void;
    reset(): void;
    logout(): Promise<void>;
    get api(): {
        transact: (trx: any) => Promise<{
            transaction_id: string | undefined;
            wasBroadcast: boolean;
            transactionId?: string | undefined;
            status?: string | undefined;
            error?: {
                code: string;
                message: string;
                name: string;
            } | undefined;
            transaction: any;
        }>;
    };
    get events(): {
        onLogin: import("rxjs").Subject<void>;
        onLogout: import("rxjs").Subject<void>;
    };
}
