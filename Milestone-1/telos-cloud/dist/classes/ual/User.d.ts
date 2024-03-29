import { RpcEndpoint, SignTransactionConfig, SignTransactionResponse } from 'universal-authenticator-library/dist/interfaces';
/**
 * Represents a logged in User and provides the ability to sign transactions as that user.
 */
export declare abstract class User {
    /**
     * @param transaction  The transaction to be signed (a object that matches the RpcAPI structure).
     */
    abstract signTransaction(transaction: any, config?: SignTransactionConfig): Promise<SignTransactionResponse>;
    /**
     * @param publicKey   The public key to use for signing.
     * @param data        The data to be signed.
     * @param helpText    Help text to explain the need for arbitrary data to be signed.
     *
     * @returns           The signature
     */
    abstract signArbitrary(publicKey: string, data: string, helpText: string): Promise<string>;
    /**
     * @param challenge   Challenge text sent to the authenticator.
     *
     * @returns           Whether the user owns the private keys corresponding with provided public keys.
     */
    abstract verifyKeyOwnership(challenge: string): Promise<boolean>;
    abstract getAccountName(): Promise<string>;
    abstract getChainId(): Promise<string>;
    abstract getKeys(): Promise<string[]>;
    protected returnEosjsTransaction(wasBroadcast: boolean, completedTransaction: any): SignTransactionResponse;
    protected buildRpcEndpoint(endPoint: RpcEndpoint): string;
}
