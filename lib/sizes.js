"use strict";
exports.__esModule = true;
var Sizes = /** @class */ (function () {
    function Sizes(oauthClient) {
        this.path = '/sizes';
        this.client = oauthClient;
    }
    Sizes.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.sizes;
        });
    };
    return Sizes;
}());
exports["default"] = Sizes;
