/// <reference types="node" />
import { EventEmitter } from 'events';
import Externals from '../core/Externals';
export interface ApiError extends Error {
    originalMessage?: string;
    response?: Response;
    request?: Request;
}
export interface ClientOptions {
    externals: Externals;
    defaultRequestInit: CreateRequestOptions;
}
export declare enum events {
    beforeRequest = "beforeRequest",
    requestSuccess = "requestSuccess",
    requestError = "requestError"
}
export default class Client extends EventEmitter {
    static _contentType: string;
    static _jsonContentType: string;
    static _multipartContentType: string;
    static _urlencodedContentType: string;
    static _headerSeparator: string;
    static _bodySeparator: string;
    static _boundarySeparator: string;
    static _unauthorizedStatus: number;
    static _rateLimitStatus: number;
    static _allowedMethods: string[];
    static _defaultRequestInit: CreateRequestOptions;
    events: typeof events;
    private _externals;
    private _defaultRequestInit;
    constructor({ externals, defaultRequestInit }: ClientOptions);
    sendRequest(request: Request): Promise<Response>;
    _loadResponse(request: Request): Promise<Response>;
    /**
     * Wraps the JS Error object with transaction information
     */
    makeError(e: any, response?: Response, request?: Request): Promise<ApiError>;
    createRequest(init?: CreateRequestOptions): Request;
    _isContentType(contentType: any, response: any): any;
    getContentType(response: any): any;
    isMultipart(response: any): any;
    isJson(response: any): any;
    toMultipart(response: Response): Promise<Response[]>;
    multipart(response: Response): Promise<Response[]>;
    /**
     * Method is used to create Response object from string parts of multipart/mixed response
     */
    private _create;
    error(response: Response, skipOKCheck?: boolean): Promise<string>;
    on(event: events.beforeRequest, listener: (request: Request) => void): any;
    on(event: events.requestSuccess, listener: (response: Response, request: Request) => void): any;
    on(event: events.requestError, listener: (error: ApiError) => void): any;
}
export interface CreateRequestOptions extends RequestInit {
    url?: string;
    body?: any;
    query?: any;
    headers?: any;
}
