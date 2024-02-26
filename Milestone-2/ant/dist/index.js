"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ant = exports.ExampleModule = exports.Ant = exports.Modules = exports.ModulesProxy = void 0;
var rxjs_1 = require("rxjs");
var version_1 = require("./version");
var ModulesProxy = /** @class */ (function (_super) {
    __extends(ModulesProxy, _super);
    function ModulesProxy(target, handler) {
        return _super.call(this, target, handler) || this;
    }
    return ModulesProxy;
}(Proxy));
exports.ModulesProxy = ModulesProxy;
var Modules = /** @class */ (function () {
    function Modules() {
        this._modules = new Map();
        this.proxy = new Proxy(this, {
            get: function (target, name) {
                if (typeof name === "string") {
                    return target.getModule(name);
                }
            }
        });
    }
    Modules.prototype.getModule = function (name) {
        return this._modules.get(name);
    };
    Modules.prototype.add = function (module) {
        this._modules.set(module.name, module);
    };
    Modules.prototype.get = function (name) {
        return this._modules.get(name);
    };
    Modules.prototype.init = function (ant) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this._modules.forEach(function (module, name) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, module.init(ant)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return Modules;
}());
exports.Modules = Modules;
var Ant = /** @class */ (function () {
    function Ant() {
        this._manager = new Modules();
    }
    Object.defineProperty(Ant.prototype, "version", {
        get: function () {
            return version_1.version;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ant.prototype, "modules", {
        get: function () {
            return this._manager.proxy;
        },
        enumerable: false,
        configurable: true
    });
    Ant.prototype.addModule = function (module) {
        this._manager.add(module);
    };
    Ant.prototype.sayHello = function () {
        console.log("--------------------------------");
        console.log("@vapaee/ant version: ".concat(this.version));
        console.log("--------------------------------");
    };
    return Ant;
}());
exports.Ant = Ant;
// Module example -------
var ExampleModule = /** @class */ (function () {
    function ExampleModule() {
        this._texto = new rxjs_1.BehaviorSubject("hola");
        this._numero = new rxjs_1.BehaviorSubject(0);
        this._change = new rxjs_1.Subject();
        console.log("ExampleModule.constructor()");
    }
    Object.defineProperty(ExampleModule.prototype, "name", {
        get: function () {
            return "example";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExampleModule.prototype, "texto", {
        get: function () {
            return this._texto;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExampleModule.prototype, "numero", {
        get: function () {
            return this._numero;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExampleModule.prototype, "change", {
        get: function () {
            return this._change;
        },
        enumerable: false,
        configurable: true
    });
    ExampleModule.prototype.setTexto = function (texto) {
        console.log("ExampleModule.setTexto()", texto);
        this._texto.next(texto);
        this._change.next({ key: "texto", value: texto });
    };
    ExampleModule.prototype.setNumero = function (numero) {
        console.log("ExampleModule.setNumero()", numero);
        this._numero.next(numero);
        this._change.next({ key: "numero", value: numero });
    };
    ExampleModule.prototype.init = function (ant) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("ExampleModule.init() ant:", ant);
                return [2 /*return*/];
            });
        });
    };
    return ExampleModule;
}());
exports.ExampleModule = ExampleModule;
exports.ant = new Ant();
exports.ant.sayHello();
exports.ant.addModule(new ExampleModule());
var example = exports.ant.modules.example;
console.log("example:", example);
console.log("ant.modules:", exports.ant.modules);
exports.default = exports.ant;
setTimeout(function () {
    example.setTexto("hola mundo");
}, 1000);
setTimeout(function () {
    example.setNumero(123);
}, 2000);
setTimeout(function () {
    example.setTexto("otro texto");
}, 3000);
setTimeout(function () {
    example.setNumero(456);
}, 4000);
//# sourceMappingURL=index.js.map