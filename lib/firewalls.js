"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var Firewalls = /** @class */ (function () {
    function Firewalls(oauthClient) {
        this.path = '/firewalls';
        this.client = oauthClient;
    }
    Firewalls.prototype.create = function (request) {
        return this.client.post(this.path, request).then(function (r) {
            return r.data.firewall;
        });
    };
    Firewalls.prototype.getById = function (firewallId) {
        var uri = this.path + "/" + firewallId;
        return this.client.get(uri).then(function (r) {
            return r.data.firewall;
        });
    };
    Firewalls.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    Firewalls.prototype.update = function (firewallId, request) {
        var uri = this.path + "/" + firewallId;
        return this.client.put(uri, request).then(function (r) {
            return r.data.firewall;
        });
    };
    Firewalls.prototype["delete"] = function (firewallId) {
        var uri = this.path + "/" + firewallId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    Firewalls.prototype.addDroplets = function (firewallId, dropletIds) {
        var uri = this.path + "/" + firewallId + "/droplets";
        return this.client.post(uri, { droplet_ids: dropletIds }).then(function (r) {
            return r.status;
        });
    };
    Firewalls.prototype.removeDroplets = function (firewallId, dropletIds) {
        var uri = this.path + "/" + firewallId + "/droplets";
        return this.client["delete"](uri, { data: { droplet_ids: dropletIds } }).then(function (r) {
            return r.status;
        });
    };
    Firewalls.prototype.addTags = function (firewallId, tags) {
        var uri = this.path + "/" + firewallId + "/tags";
        return this.client.post(uri, { tags: tags }).then(function (r) {
            return r.status;
        });
    };
    Firewalls.prototype.removeTags = function (firewallId, tags) {
        var uri = this.path + "/" + firewallId + "/tags";
        return this.client["delete"](uri, { data: { tags: tags } }).then(function (r) {
            return r.status;
        });
    };
    Firewalls.prototype.addRules = function (firewallId, inboundRules, outboundRules) {
        var uri = this.path + "/" + firewallId + "/rules";
        return this.client.post(uri, { inbound_rules: inboundRules, outbound_rules: outboundRules }).then(function (r) {
            return r.status;
        });
    };
    Firewalls.prototype.removeRules = function (firewallId, inboundRules, outboundRules) {
        var uri = this.path + "/" + firewallId + "/rules";
        return this.client["delete"](uri, { data: { inbound_rules: inboundRules, outbound_rules: outboundRules } }).then(function (r) {
            return r.status;
        });
    };
    return Firewalls;
}());
exports["default"] = Firewalls;
