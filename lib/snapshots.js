"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var Snapshots = /** @class */ (function () {
    function Snapshots(oauthClient) {
        this.path = '/snapshots';
        this.client = oauthClient;
    }
    Snapshots.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    Snapshots.prototype.getById = function (snapshotId) {
        var uri = this.path + "/" + snapshotId;
        return this.client.get(uri).then(function (r) {
            return r.data.snapshot;
        });
    };
    Snapshots.prototype.droplet = function () {
        var params = { resource_type: 'droplet' };
        var cursor = new DOCursor_1["default"](this.client, this.path, params, 40);
        return cursor;
    };
    Snapshots.prototype.volume = function () {
        var params = { resource_type: 'volume' };
        var cursor = new DOCursor_1["default"](this.client, this.path, params, 40);
        return cursor;
    };
    Snapshots.prototype["delete"] = function (snapshotId) {
        var uri = this.path + "/" + snapshotId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    return Snapshots;
}());
exports["default"] = Snapshots;
