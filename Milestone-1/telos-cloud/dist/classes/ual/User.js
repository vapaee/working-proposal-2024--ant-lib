"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/**
 * Represents a logged in User and provides the ability to sign transactions as that user.
 */
class User {
    returnEosjsTransaction(wasBroadcast, completedTransaction) {
        if (wasBroadcast) {
            if (completedTransaction.hasOwnProperty('transaction_id')) {
                return {
                    wasBroadcast: true,
                    transactionId: completedTransaction.transaction_id,
                    status: completedTransaction.processed.receipt.status,
                    transaction: completedTransaction,
                };
            }
            else if (completedTransaction.hasOwnProperty('code')) {
                return {
                    wasBroadcast: true,
                    error: {
                        code: completedTransaction.code,
                        message: completedTransaction.message,
                        name: completedTransaction.error.name,
                    },
                    transaction: completedTransaction,
                };
            }
            else {
                return {
                    wasBroadcast: true,
                    transaction: completedTransaction,
                };
            }
        }
        else {
            return {
                wasBroadcast: false,
                transaction: completedTransaction,
            };
        }
    }
    buildRpcEndpoint(endPoint) {
        let rpcEndpointString = `${endPoint.protocol}://${endPoint.host}:${endPoint.port}`;
        if (endPoint.path) {
            let separator = '/';
            if (endPoint.path.startsWith('/')) {
                separator = '';
            }
            rpcEndpointString = `${rpcEndpointString}${separator}${endPoint.path}`;
        }
        if (rpcEndpointString.endsWith('/')) {
            rpcEndpointString = rpcEndpointString.substring(0, rpcEndpointString.length - 1);
        }
        return rpcEndpointString;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map