"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var Droplets = /** @class */ (function () {
    function Droplets(oauthClient) {
        this.path = '/droplets';
        this.client = oauthClient;
    }
    Droplets.prototype.create = function (request) {
        return this.client.post(this.path, request).then(function (r) {
            return r.data.droplet;
        });
    };
    Droplets.prototype.createMany = function (request) {
        return this.client.post(this.path, request).then(function (r) {
            return r.data.droplets;
        });
    };
    Droplets.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    Droplets.prototype.getById = function (dropletId) {
        var uri = this.path + "/" + dropletId;
        return this.client.get(uri).then(function (r) {
            return r.data.droplet;
        });
    };
    Droplets.prototype.getByTag = function (tagName) {
        var cursor = new DOCursor_1["default"](this.client, this.path, { tag_name: tagName }, 40);
        return cursor;
    };
    Droplets.prototype.kernels = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/kernels";
        var cursor = new DOCursor_1["default"](this.client, uri, undefined, 40);
        return cursor;
    };
    Droplets.prototype.snapshots = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/snapshots";
        var cursor = new DOCursor_1["default"](this.client, uri, undefined, 40);
        return cursor;
    };
    Droplets.prototype.backups = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/backups";
        return this.client.get(uri).then(function (r) {
            return r.data.backups;
        });
    };
    Droplets.prototype.actions = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/actions";
        var cursor = new DOCursor_1["default"](this.client, uri, undefined, 40);
        return cursor;
    };
    Droplets.prototype["delete"] = function (dropletId) {
        var uri = this.path + "/" + dropletId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    Droplets.prototype.deleteByTag = function (tagName) {
        return this.client["delete"](this.path, { params: { tag_name: tagName } }).then(function (r) {
            return r.status;
        });
    };
    Droplets.prototype.dropletNeighbors = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/neighbors";
        return this.client.get(uri).then(function (r) {
            return r.data.droplets;
        });
    };
    Droplets.prototype.neighbors = function () {
        var uri = "/reports/droplet_neighbors";
        return this.client.get(uri).then(function (r) {
            return r.data.neighbors;
        });
    };
    return Droplets;
}());
exports["default"] = Droplets;
