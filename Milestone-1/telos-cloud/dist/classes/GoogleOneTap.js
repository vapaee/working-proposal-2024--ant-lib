"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCtrl = exports.GoogleOneTapController = void 0;
const types_1 = require("../types");
const Buffer = __importStar(require("buffer"));
const rxjs_1 = require("rxjs");
let google = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _window = window;
class GoogleOneTapController {
    constructor() {
        this.onSuccessfulLogin = new rxjs_1.BehaviorSubject(null);
        this.onError = new rxjs_1.BehaviorSubject(null);
        this.onMoment = new rxjs_1.Subject();
        this.clientId = '';
        this.buttonConfig = { theme: 'outline', size: 'large' }; // default config
        this.timer = setTimeout(() => { }, 0);
    }
    init(clientId) {
        this.clientId = clientId;
        this.installGoogleOneTapScript();
        console.log('GoogleOneTapController.init', clientId);
    }
    installGoogleOneTapScript() {
        if (google) {
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        _window.onGoogleLibraryLoad = () => {
            this.onGoogleLibraryLoad();
        };
    }
    onGoogleLibraryLoad() {
        if (!google) {
            if (_window.google) {
                google = _window.google;
            }
            else {
                throw new types_1.AntelopeError('Google One Tap library not loaded');
            }
        }
        if (google) {
            google.accounts.id.initialize({
                client_id: this.clientId,
                callback: (response) => {
                    if (response) {
                        const jwt = response.credential;
                        const decoded = this.decodeJWT(jwt);
                        this.handleOneTapSuccess(decoded, jwt);
                    }
                    else {
                        this.handleOneTapError(JSON.stringify(response));
                    }
                },
            });
        }
    }
    decodeJWT(jwt) {
        const parts = jwt.split('.');
        const header = parts[0];
        const payload = parts[1];
        const decodedHeader = Buffer.Buffer.from(header, 'base64').toString('utf8');
        const decodedPayload = Buffer.Buffer.from(payload, 'base64').toString('utf8');
        return {
            header: JSON.parse(decodedHeader),
            payload: JSON.parse(decodedPayload),
        };
    }
    setButtonConfig(config) {
        this.buttonConfig = config;
    }
    renderButton(tag_id = 'google_btn') {
        console.log('renderButton', tag_id);
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const btn = document.getElementById(tag_id);
            if (!btn) {
                console.error('google button not found using tag_id: ', tag_id);
            }
            if (google && btn) {
                google.accounts.id.renderButton(btn, this.buttonConfig);
            }
        }, 100);
    }
    handleOneTapMoment(type, status, reason) {
        this.onMoment.next({ type, status, reason });
    }
    handleOneTapSuccess(response, jwt) {
        const email = response.payload.email;
        this.onSuccessfulLogin.next({ email, jwt });
    }
    handleOneTapError(error) {
        console.error('handleOneTapError', error);
        this.onError.next(error);
    }
    logout() {
        if (google) {
            google.accounts.id.disableAutoSelect();
            this.onSuccessfulLogin.next(null);
        }
    }
}
exports.GoogleOneTapController = GoogleOneTapController;
exports.googleCtrl = new GoogleOneTapController();
//# sourceMappingURL=GoogleOneTap.js.map