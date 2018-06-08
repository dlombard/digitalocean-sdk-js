"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var FloatingIps = /** @class */ (function () {
    function FloatingIps(oauthClient) {
        this.path = '/floating_ips';
        this.client = oauthClient;
    }
    FloatingIps.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    FloatingIps.prototype.createDropletFloatingIp = function (dropletId) {
        return this.client.post(this.path, { droplet_id: dropletId }).then(function (r) {
            return r.data.floating_ip;
        });
    };
    FloatingIps.prototype.createRegionFloatingIp = function (region) {
        return this.client.post(this.path, { region: region }).then(function (r) {
            return r.data.floating_ip;
        });
    };
    FloatingIps.prototype.getByIp = function (ipAddr) {
        var uri = this.path + "/" + ipAddr;
        return this.client.get(uri).then(function (r) {
            return r.data.floating_ip;
        });
    };
    FloatingIps.prototype["delete"] = function (ipAddr) {
        var uri = this.path + "/" + ipAddr;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    return FloatingIps;
}());
exports["default"] = FloatingIps;
