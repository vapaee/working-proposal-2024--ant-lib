/// <reference types="node" />
import { BehaviorSubject, Subject } from 'rxjs';
export interface GoogleCredentials {
    email: string;
    jwt: string;
    account?: string;
}
interface SuccessResponse {
    header: {
        alg: string;
        kid: string;
        typ: string;
    };
    payload: {
        iss: string;
        azp: string;
        aud: string;
        sub: string;
        email: string;
        email_verified: boolean;
        at_hash: string;
        nonce: string;
        exp: number;
        iat: number;
    };
}
export declare class GoogleOneTapController {
    onSuccessfulLogin: BehaviorSubject<GoogleCredentials | null>;
    onError: BehaviorSubject<string | null>;
    onMoment: Subject<{
        type: string;
        status: string;
        reason: string;
    }>;
    clientId: string;
    buttonConfig: {
        theme: string;
        size: string;
    };
    constructor();
    init(clientId: string): void;
    installGoogleOneTapScript(): void;
    onGoogleLibraryLoad(): void;
    decodeJWT(jwt: string): {
        header: any;
        payload: any;
    };
    setButtonConfig(config: {
        theme: string;
        size: string;
    }): void;
    timer: NodeJS.Timeout;
    renderButton(tag_id?: string): void;
    handleOneTapMoment(type: string, status: string, reason: string): void;
    handleOneTapSuccess(response: SuccessResponse, jwt: string): void;
    handleOneTapError(error: string): void;
    logout(): void;
}
export declare const googleCtrl: GoogleOneTapController;
export {};
