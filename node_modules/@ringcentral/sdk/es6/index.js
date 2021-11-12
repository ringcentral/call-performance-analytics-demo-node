import DomStorage from 'dom-storage';
import fetch, { Request, Response, Headers } from 'node-fetch';
import { setDefaultExternals } from './SDK';
export * from './SDK';
var localStorage = new DomStorage(null, { strict: true });
setDefaultExternals({
    localStorage: localStorage,
    fetch: fetch,
    Request: Request,
    Response: Response,
    Headers: Headers,
});
//# sourceMappingURL=index.js.map