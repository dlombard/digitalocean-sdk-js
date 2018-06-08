"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var Regions = /** @class */ (function () {
    function Regions(oauthClient) {
        this.path = '/regions';
        this.client = oauthClient;
    }
    Regions.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    return Regions;
}());
exports["default"] = Regions;
