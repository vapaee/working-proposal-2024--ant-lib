export interface AntelopeErrorPayload {
    [key: string]: unknown;
}
export declare class AntelopeError extends Error {
    _payload?: unknown;
    payload?: AntelopeErrorPayload;
    constructor(message: string | undefined, _payload?: unknown);
}
