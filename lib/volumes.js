"use strict";
exports.__esModule = true;
var Volumes = /** @class */ (function () {
    function Volumes(oauthClient) {
        this.path = '/volumes';
        this.client = oauthClient;
    }
    Volumes.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.volumes;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Volumes.prototype.create = function (volumeRequest) {
        return this.client.post(this.path, volumeRequest).then(function (r) {
            return r.data.volume;
        })["catch"](function (e) {
            console.error(e.response);
        });
    };
    Volumes.prototype.getById = function (id) {
        var uri = "/" + this.path + "/" + id;
        return this.client.get(uri).then(function (r) {
            return r.data.volume;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Volumes.prototype.getByName = function (name) {
        var uri = this.path + "/" + name;
        return this.client.get(uri).then(function (r) {
            return r.data.volume;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Volumes.prototype.snapshots = function (id) {
        var uri = "/" + this.path + "/" + id + "/snapshots";
        return this.client.get(uri).then(function (r) {
            return r.data.snapshots;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Volumes.prototype.createSnapshot = function (id, name) {
        var uri = "/" + this.path + "/" + id + "/snapshots";
        return this.client.post(uri, { name: name }).then(function (r) {
            return r.data.snapshot;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Volumes.prototype["delete"] = function (id) {
        var uri = "/" + this.path + "/" + id;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Volumes.prototype.deleteByName = function (name, region) {
        var params = {
            name: name,
            region: region
        };
        return this.client["delete"](this.path, { params: params }).then(function (r) {
            return r.status;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Volumes.prototype.deleteSnapshot = function (snapshotId) {
        var uri = "/snapshots/" + snapshotId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    return Volumes;
}());
exports["default"] = Volumes;
