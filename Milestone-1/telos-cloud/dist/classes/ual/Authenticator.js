"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
/**
 * Represents Button that is rendered for, and interfaces with, a specific Authenticator app.
 */
class Authenticator {
    /**
     * @param chains     This represents each of the chains that the dapp provides support for.
     *
     * @param options    Optional argument that is intended for Authenticator specific options.
     */
    constructor(chains, options) {
        this.chains = chains;
        this.options = options;
        /**
         * Default value for shouldInvalidateAfter(), 1 week in seconds
         */
        this.defaultInvalidateAfter = 604800;
    }
    /**
     * Returns the amount of seconds after the authentication will be invalid for logging in on new
     * browser sessions.  Setting this value to zero will cause users to re-attempt authentication on
     * every new browser session.  Please note that the invalidate time will be saved client-side and
     * should not be relied on for security.
     */
    shouldInvalidateAfter() {
        return this.defaultInvalidateAfter;
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=Authenticator.js.map