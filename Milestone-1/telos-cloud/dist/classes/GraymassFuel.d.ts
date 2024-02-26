import { User } from 'universal-authenticator-library';
export interface FuelUserWrapperConfig {
    rpcEndpoint: string;
    hyperionEndpoint: string;
}
export declare function initFuelUserWrapper(user: User, config: FuelUserWrapperConfig): Promise<User>;
