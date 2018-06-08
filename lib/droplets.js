"use strict";
exports.__esModule = true;
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
        return this.client.get(this.path).then(function (r) {
            return r.data.droplets;
        });
    };
    Droplets.prototype.getById = function (dropletId) {
        var uri = this.path + "/" + dropletId;
        return this.client.get(uri).then(function (r) {
            return r.data.droplet;
        });
    };
    Droplets.prototype.getByTag = function (tagName) {
        return this.client.get(this.path, { params: { tag_name: tagName } }).then(function (r) {
            return r.data.droplets;
        });
    };
    Droplets.prototype.kernels = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/kernels";
        return this.client.get(uri).then(function (r) {
            return r.data.kernels;
        });
    };
    Droplets.prototype.snapshots = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/snapshots";
        return this.client.get(uri).then(function (r) {
            return r.data.snapshots;
        });
    };
    Droplets.prototype.backups = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/backups";
        return this.client.get(uri).then(function (r) {
            return r.data.backups;
        });
    };
    Droplets.prototype.actions = function (dropletId) {
        var uri = this.path + "/" + dropletId + "/actions";
        return this.client.get(uri).then(function (r) {
            return r.data.actions;
        });
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
