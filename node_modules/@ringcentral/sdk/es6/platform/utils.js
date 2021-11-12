export var delay = function (timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(null);
        }, timeout);
    });
};
//# sourceMappingURL=utils.js.map