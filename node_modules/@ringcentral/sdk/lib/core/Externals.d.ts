export interface ExternalsOptions {
    fetch?: typeof fetch;
    Request?: typeof Request;
    Response?: typeof Response;
    Headers?: typeof Headers;
    localStorage?: Storage;
}
export default class Externals implements ExternalsOptions {
    fetch: any;
    Request: any;
    Response: any;
    Headers: any;
    localStorage: any;
    constructor({ fetch: fetchImpl, Request: RequestImpl, Response: ResponseImpl, Headers: HeadersImpl, localStorage, }?: ExternalsOptions);
}
