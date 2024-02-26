import { BehaviorSubject, Subject } from 'rxjs';
export interface IModules {
    readonly name: string;
    init<TMyModules>(ant: Ant<TMyModules>): Promise<void>;
}
export declare class ModulesProxy extends Proxy<Modules> {
    constructor(target: Modules, handler: ProxyHandler<Modules>);
}
export declare class Modules {
    private _modules;
    readonly proxy: ModulesProxy;
    constructor();
    private getModule;
    add(module: IModules): void;
    get(name: string): IModules;
    init<TMyModules>(ant: Ant<TMyModules>): Promise<void>;
}
export declare class Ant<TMyModules> {
    private _manager;
    constructor();
    get version(): string;
    get modules(): TMyModules;
    addModule(module: IModules): void;
    sayHello(): void;
}
export declare class ExampleModule implements IModules {
    private _texto;
    private _numero;
    private _change;
    constructor();
    get name(): string;
    get texto(): BehaviorSubject<string>;
    get numero(): BehaviorSubject<number>;
    get change(): Subject<{
        key: string;
        value: never;
    }>;
    setTexto(texto: string): void;
    setNumero(numero: number): void;
    init<TMyModules>(ant: Ant<TMyModules>): Promise<void>;
}
export interface IMyModules {
    example: ExampleModule;
}
export declare const ant: Ant<IMyModules>;
export default ant;
