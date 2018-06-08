"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var Sizes = /** @class */ (function () {
    function Sizes(oauthClient) {
        this.path = '/sizes';
        this.client = oauthClient;
    }
    Sizes.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    return Sizes;
}());
exports["default"] = Sizes;
