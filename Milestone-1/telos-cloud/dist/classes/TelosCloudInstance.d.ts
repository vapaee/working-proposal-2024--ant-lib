import { TelosCloudLoggedUser, TelosCloudOptions } from '../types';
import { GoogleCredentials } from '..';
import { Subject, Subscription } from 'rxjs';
import { MetakeepAuthenticator } from './MetakeepUAL';
import { User } from 'universal-authenticator-library';
export declare class TelosCloudInstance {
    googleSubscription: Subscription | null;
    onLogin: Subject<void>;
    onLogout: Subject<void>;
    auth: MetakeepAuthenticator | null;
    config: TelosCloudOptions | null;
    user: User | null;
    logged: TelosCloudLoggedUser | null;
    constructor();
    init(config: TelosCloudOptions): void;
    reset(): void;
    performTelosCloudLogin(data: GoogleCredentials): void;
    saveLoggedUser(): Promise<void>;
    checkAutoLogin(): Promise<void>;
    setMetakeepZero(credentials: GoogleCredentials): Promise<void>;
    get version(): string;
    get userAccount(): string;
    get pubKeys(): string[];
    get events(): {
        onLogin: Subject<void>;
        onLogout: Subject<void>;
    };
    isAutoLoginAvailable(): Promise<boolean>;
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
}
export declare const telosCloud: TelosCloudInstance;
