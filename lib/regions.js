"use strict";
exports.__esModule = true;
var Regions = /** @class */ (function () {
    function Regions(oauthClient) {
        this.path = '/regions';
        this.client = oauthClient;
    }
    Regions.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.regions;
        });
    };
    return Regions;
}());
exports["default"] = Regions;
