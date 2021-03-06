"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var FloatingIpActions = /** @class */ (function () {
    function FloatingIpActions(oauthClient) {
        this.path = '/floating_ips';
        this.client = oauthClient;
    }
    FloatingIpActions.prototype.assign = function (ipAddr) {
        var uri = this.path + "/" + ipAddr + "/actions";
        return this.client.post(uri, { type: 'assign' }).then(function (r) {
            return r.data.action;
        });
    };
    FloatingIpActions.prototype.unassign = function (ipAddr) {
        var uri = this.path + "/" + ipAddr + "/actions";
        return this.client.post(uri, { type: 'unassign' }).then(function (r) {
            return r.data.action;
        });
    };
    FloatingIpActions.prototype.get = function (ipAddr) {
        var uri = this.path + "/" + ipAddr + "/actions";
        var cursor = new DOCursor_1["default"](this.client, uri, undefined, 40);
        return cursor;
    };
    FloatingIpActions.prototype.getByActionId = function (ipAddr, actionId) {
        var uri = this.path + "/" + ipAddr + "/actions/" + actionId;
        return this.client.get(uri).then(function (r) {
            return r.data.action;
        });
    };
    return FloatingIpActions;
}());
exports["default"] = FloatingIpActions;
