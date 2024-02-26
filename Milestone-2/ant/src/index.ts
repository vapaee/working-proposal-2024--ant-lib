import { BehaviorSubject, Subject } from 'rxjs';
import { version } from './version';

export interface IModules {
    readonly name: string;
    init<TMyModules>(ant: Ant<TMyModules>): Promise<void>;
}


export class ModulesProxy extends Proxy<Modules> {
    constructor(target: Modules, handler: ProxyHandler<Modules>) {
        super(target, handler);
    }
}

export class Modules {

    private _modules: Map<string, IModules> = new Map();
    public readonly proxy;
    constructor() {
        this.proxy = new Proxy(this, {
            get: (target, name: string) => {
                if (typeof name === "string") {
                    return target.getModule(name);
                }
            }
        }) as ModulesProxy;
    }

    private getModule<T extends IModules>(name: string): T {
        return this._modules.get(name) as T;
    }
    
    add(module: IModules): void {
        this._modules.set(module.name, module);
    }

    get(name: string): IModules {
        return this._modules.get(name) as IModules;
    }

    async init<TMyModules>(ant: Ant<TMyModules>): Promise<void> {
        this._modules.forEach(async (module: IModules, name: string) => {
            await module.init(ant);
        });
    }
}

export class Ant<TMyModules> {

    private _manager = new Modules();

    constructor() {
    }

    get version(): string {
        return version;
    }

    get modules(): TMyModules {
        return this._manager.proxy as unknown as TMyModules;
    }

    addModule(module: IModules): void {
        this._manager.add(module);
    }

    sayHello(): void {
        console.log("--------------------------------");
        console.log(`@vapaee/ant version: ${this.version}`);
        console.log("--------------------------------");
    }
}

// Module example -------
export class ExampleModule implements IModules {

    private _texto = new BehaviorSubject<string>("hola");
    private _numero = new BehaviorSubject<number>(0);
    private _change = new Subject<{key:string, value:never}>();

    constructor() {
        console.log("ExampleModule.constructor()");
    }

    get name(): string {
        return "example";
    }

    get texto(): BehaviorSubject<string> {
        return this._texto;
    }

    get numero(): BehaviorSubject<number> {
        return this._numero;
    }

    get change(): Subject<{key:string, value:never}> {
        return this._change;
    }

    setTexto(texto: string): void {
        console.log("ExampleModule.setTexto()", texto);
        this._texto.next(texto);
        this._change.next({key: "texto", value: texto as never});
    }

    setNumero(numero: number): void {
        console.log("ExampleModule.setNumero()", numero);
        this._numero.next(numero);
        this._change.next({key: "numero", value: numero as never});
    }

    async init<TMyModules>(ant: Ant<TMyModules>): Promise<void> {
        console.log("ExampleModule.init() ant:", ant);
    }
}

// export const ant = new Ant();
// ----------------------

export interface IMyModules {
    example: ExampleModule;
}

export const ant = new Ant<IMyModules>();
ant.sayHello();
ant.addModule(new ExampleModule());
const example = ant.modules.example;
console.log("example:", example);
console.log("ant.modules:", ant.modules);
export default ant;

setTimeout(() => {
    example.setTexto("hola mundo");
}, 1000);

setTimeout(() => {
    example.setNumero(123);
}, 2000);

setTimeout(() => {
    example.setTexto("otro texto");
}, 3000);

setTimeout(() => {
    example.setNumero(456);
}, 4000);


