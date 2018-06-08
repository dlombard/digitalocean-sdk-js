"use strict";
exports.__esModule = true;
var Snapshots = /** @class */ (function () {
    function Snapshots(oauthClient) {
        this.path = '/snapshots';
        this.client = oauthClient;
    }
    Snapshots.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.snapshots;
        });
    };
    Snapshots.prototype.getById = function (snapshotId) {
        var uri = this.path + "/" + snapshotId;
        return this.client.get(uri).then(function (r) {
            return r.data.snapshot;
        });
    };
    Snapshots.prototype.droplet = function () {
        return this.client.get(this.path, { params: { resource_type: 'droplet' } }).then(function (r) {
            return r.data.snapshots;
        });
    };
    Snapshots.prototype.volume = function () {
        return this.client.get(this.path, { params: { resource_type: 'volume' } }).then(function (r) {
            return r.data.snapshots;
        });
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
