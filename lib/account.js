"use strict";
exports.__esModule = true;
var Account = /** @class */ (function () {
    function Account(oauthClient) {
        this.path = '/account';
        this.client = oauthClient;
    }
    Account.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.account;
        });
    };
    return Account;
}());
exports["default"] = Account;
