import Cache from '../core/Cache';
export interface AuthOptions {
    refreshHandicapMs?: number;
}
export interface AuthOptionsConstructor extends AuthOptions {
    cache: Cache;
    cacheId: string;
}
export default class Auth {
    private _cache;
    private readonly _cacheId;
    private readonly _refreshHandicapMs;
    constructor({ cache, cacheId, refreshHandicapMs }: AuthOptionsConstructor);
    data(): Promise<AuthData>;
    setData(newData?: AuthData): Promise<void>;
    /**
     * Check if there is a valid (not expired) access token
     */
    accessTokenValid(): Promise<boolean>;
    /**
     * Check if there is a valid (not expired) access token
     */
    refreshTokenValid(): Promise<boolean>;
    cancelAccessToken(): Promise<void>;
}
export interface AuthData {
    token_type?: string;
    access_token?: string;
    expires_in?: string;
    expire_time?: number;
    refresh_token?: string;
    refresh_token_expires_in?: string;
    refresh_token_expire_time?: number;
    scope?: string;
    code_verifier?: string;
    owner_id?: string;
    endpoint_id?: string;
}
