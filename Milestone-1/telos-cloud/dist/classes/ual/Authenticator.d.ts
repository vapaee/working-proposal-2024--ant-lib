import { ButtonStyle, Chain } from 'universal-authenticator-library/dist/interfaces';
import { UALError } from 'universal-authenticator-library/dist/UALError';
import { User } from './User';
/**
 * Represents Button that is rendered for, and interfaces with, a specific Authenticator app.
 */
export declare abstract class Authenticator {
    chains: Chain[];
    options?: any;
    /**
     * Default value for shouldInvalidateAfter(), 1 week in seconds
     */
    private defaultInvalidateAfter;
    /**
     * @param chains     This represents each of the chains that the dapp provides support for.
     *
     * @param options    Optional argument that is intended for Authenticator specific options.
     */
    constructor(chains: Chain[], options?: any);
    /**
     * Attempts to render the Authenticator and updates the authenticator's state, accordingly
     */
    abstract init(): Promise<void>;
    /**
     * Resets the authenticator to its initial, default state then calls init method
     */
    abstract reset(): void;
    /**
     * Returns true if the authenticator has errored while initializing.
     */
    abstract isErrored(): boolean;
    /**
     * Returns a URL where the user can download and install the underlying authenticator
     * if it is not found by the UAL Authenticator.
     */
    abstract getOnboardingLink(): string;
    /**
     * Returns error (if available) if the authenticator has errored while initializing.
     */
    abstract getError(): UALError | null;
    /**
     * Returns true if the authenticator is loading while initializing its internal state.
     */
    abstract isLoading(): boolean;
    /**
     * Returns the style of the Button that will be rendered.
     */
    abstract getStyle(): ButtonStyle;
    /**
     * Returns whether or not the button should render based on the operating environment and other factors.
     * ie. If your Authenticator App does not support mobile, it returns false when running in a mobile browser.
     */
    abstract shouldRender(): boolean;
    /**
     * Returns whether or not the dapp should attempt to auto login with the Authenticator app.
     * Auto login will only occur when there is only one Authenticator that returns shouldRender() true and
     * shouldAutoLogin() true.
     */
    abstract shouldAutoLogin(): boolean;
    /**
     * Returns whether or not the button should show an account name input field.
     * This is for Authenticators that do not have a concept of account names.
     */
    abstract shouldRequestAccountName(): Promise<boolean>;
    /**
     * Returns the amount of seconds after the authentication will be invalid for logging in on new
     * browser sessions.  Setting this value to zero will cause users to re-attempt authentication on
     * every new browser session.  Please note that the invalidate time will be saved client-side and
     * should not be relied on for security.
     */
    shouldInvalidateAfter(): number;
    /**
     * Login using the Authenticator App. This can return one or more users depending on multiple chain support.
     *
     * @param accountName  The account name of the user for Authenticators that do not store accounts (optional)
     */
    abstract login(accountName?: string): Promise<User[]>;
    /**
     * Logs the user out of the dapp. This will be strongly dependent on each Authenticator app's patterns.
     */
    abstract logout(): Promise<void>;
    /**
     * Returns true if user confirmation is required for `getKeys`
     */
    abstract requiresGetKeyConfirmation(): boolean;
    /**
     * Returns the name of the authenticator.
     */
    abstract getName(): string;
}
