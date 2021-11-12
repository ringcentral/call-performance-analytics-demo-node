"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root = (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (function getRoot() {
        return this;
    })();
var Externals = /** @class */ (function () {
    function Externals(_a) {
        var _b = _a === void 0 ? {} : _a, fetchImpl = _b.fetch, RequestImpl = _b.Request, ResponseImpl = _b.Response, HeadersImpl = _b.Headers, localStorage = _b.localStorage;
        this.fetch = root.fetch;
        this.Request = root.Request;
        this.Response = root.Response;
        this.Headers = root.Headers;
        this.localStorage = root.localStorage;
        if (fetchImpl)
            this.fetch = fetchImpl;
        if (RequestImpl)
            this.Request = RequestImpl;
        if (ResponseImpl)
            this.Response = ResponseImpl;
        if (HeadersImpl)
            this.Headers = HeadersImpl;
        if (localStorage)
            this.localStorage = localStorage;
        /* istanbul ignore next */
        if (!this.fetch || !this.Response || !this.Request || !this.Headers) {
            throw new Error('Fetch API is missing');
        }
        /* istanbul ignore next */
        if (!this.localStorage) {
            throw new Error('LocalStorage is missing');
        }
    }
    return Externals;
}());
exports.default = Externals;
//# sourceMappingURL=Externals.js.map