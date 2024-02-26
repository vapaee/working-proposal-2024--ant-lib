import { Chain, UALError } from 'universal-authenticator-library';
import { ButtonStyle } from 'universal-authenticator-library/dist/interfaces';
import { User } from 'universal-authenticator-library';
export interface UserCredentials {
    email: string;
    jwt: string;
}
export interface MetakeepUALOptions {
    appId: string;
    appName: string;
    accountCreateAPI?: string;
    reasonCallback?: (transaction: any) => string;
}
export interface MetakeepData {
    [email: string]: {
        [chainId: string]: {
            accounts: string[];
            wallet: {
                eosAddress: string;
                solAddress: string;
                ethAddress: string;
            };
        };
    };
}
export interface MetakeepAccountSelector {
    selectAccount: (accounts: string[]) => Promise<string>;
}
export interface MetakeepNameAccountSelector {
    selectAccountName: () => Promise<string>;
}
export declare abstract class Authenticator {
    chains: Chain[];
    options?: any;
    private defaultInvalidateAfter;
    constructor(chains: Chain[], options?: any);
    abstract init(): Promise<void>;
    abstract reset(): void;
    abstract isErrored(): boolean;
    abstract getOnboardingLink(): string;
    abstract getError(): UALError | null;
    abstract isLoading(): boolean;
    abstract getStyle(): ButtonStyle;
    abstract shouldRender(): boolean;
    abstract shouldAutoLogin(): boolean;
    abstract shouldRequestAccountName(): Promise<boolean>;
    shouldInvalidateAfter(): number;
    abstract login(accountName?: string): Promise<User[]>;
    abstract logout(): Promise<void>;
    abstract requiresGetKeyConfirmation(): boolean;
    abstract getName(): string;
}
export declare class MetakeepAuthenticator extends Authenticator {
    private chainId;
    private endpoint;
    private accountCreateAPI?;
    private appId;
    private loading;
    private userCredentials;
    private accountSelector;
    private accountNameSelector;
    constructor(chains: Chain[], options: MetakeepUALOptions);
    resetAccountSelector(): void;
    setAccountSelector(accountSelector: MetakeepAccountSelector): void;
    setAccountNameSelector(accountNameSelector: MetakeepNameAccountSelector): void;
    saveCache(): void;
    init(): Promise<void>;
    setUserCredentials(credentials: UserCredentials): void;
    /**
     * Resets the authenticator to its initial, default state then calls init method
     */
    reset(): void;
    /**
     * Returns true if the authenticator has errored while initializing.
     */
    isErrored(): boolean;
    getName(): string;
    /**
     * Returns a URL where the user can download and install the underlying authenticator
     * if it is not found by the UAL Authenticator.
     */
    getOnboardingLink(): string;
    /**
     * Returns error (if available) if the authenticator has errored while initializing.
     */
    getError(): UALError | null;
    /**
     * Returns true if the authenticator is loading while initializing its internal state.
     */
    isLoading(): boolean;
    /**
     * Returns the style of the Button that will be rendered.
     */
    getStyle(): {
        icon: string;
        text: string;
        background: string;
        textColor: string;
    };
    /**
     * Returns whether or not the button should render based on the operating environment and other factors.
     * ie. If your Authenticator App does not support mobile, it returns false when running in a mobile browser.
     */
    shouldRender(): boolean;
    /**
     * Returns whether or not the dapp should attempt to auto login with the Authenticator app.
     * Auto login will only occur when there is only one Authenticator that returns shouldRender() true and
     * shouldAutoLogin() true.
     */
    shouldAutoLogin(): boolean;
    /**
     * Returns whether or not the button should show an account name input field.
     * This is for Authenticators that do not have a concept of account names.
     */
    shouldRequestAccountName(): Promise<boolean>;
    createAccount(publicKey: string): Promise<string>;
    resolveAccountName(): Promise<string>;
    /**
     * Login using the Authenticator App. This can return one or more users depending on multiple chain support.
     *
     * @param accountName    The account name of the user for Authenticators that do not store accounts (optional)
     */
    login: () => Promise<[User]>;
    /**
     * Logs the user out of the dapp. This will be strongly dependent on each
     * Authenticator app's patterns.
     */
    logout: () => Promise<void>;
    /**
     * Returns true if user confirmation is required for `getKeys`
     */
    requiresGetKeyConfirmation(): boolean;
}
