import Externals from './Externals';
export interface CacheOptions {
    prefix?: string;
    externals: Externals;
}
export default class Cache {
    static defaultPrefix: string;
    private readonly _prefix;
    private _externals;
    constructor({ prefix, externals }: CacheOptions);
    setItemSync(key: any, data: any): this;
    setItem(key: any, data: any): Promise<void>;
    removeItemSync(key: any): this;
    removeItem(key: any): Promise<void>;
    getItemSync(key: any): any;
    getItem(key: any): Promise<any>;
    private _keys;
    clean(): Promise<this>;
    private _prefixKey;
}
