"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntelopeError = void 0;
class AntelopeError extends Error {
    constructor(message, _payload) {
        super(message);
        this._payload = _payload;
        if (_payload) {
            this.payload = _payload;
        }
    }
}
exports.AntelopeError = AntelopeError;
//# sourceMappingURL=AntelopeError.js.map