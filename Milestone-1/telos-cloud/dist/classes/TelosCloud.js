"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelosCloud = void 0;
const __1 = require("..");
const TelosCloudInstance_1 = require("./TelosCloudInstance");
class TelosCloud {
    constructor(config) {
        console.log("TelosCloud.constructor()");
        TelosCloudInstance_1.telosCloud.init(config);
    }
    get version() {
        console.log("TelosCloud.version");
        return __1.version;
    }
    get userAccount() {
        console.log("TelosCloud.userAccount");
        return TelosCloudInstance_1.telosCloud.userAccount;
    }
    get pubKeys() {
        console.log("TelosCloud.pubKeys");
        return TelosCloudInstance_1.telosCloud.pubKeys;
    }
    checkAutoLogin() {
        console.log("TelosCloud.checkAutoLogin()");
        TelosCloudInstance_1.telosCloud.checkAutoLogin();
    }
    // async login(): Promise<string> {
    //     return telosCloud.login();
    // }
    reset() {
        console.log("TelosCloud.reset()");
        TelosCloudInstance_1.telosCloud.reset();
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return TelosCloudInstance_1.telosCloud.logout();
        });
    }
    get api() {
        return TelosCloudInstance_1.telosCloud.api;
    }
    get events() {
        return TelosCloudInstance_1.telosCloud.events;
    }
}
exports.TelosCloud = TelosCloud;
//# sourceMappingURL=TelosCloud.js.map