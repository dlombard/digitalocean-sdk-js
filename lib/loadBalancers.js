"use strict";
exports.__esModule = true;
var LoadBalancers = /** @class */ (function () {
    function LoadBalancers(oauthClient) {
        this.path = '/load_balancers';
        this.client = oauthClient;
    }
    LoadBalancers.prototype.create = function (request) {
        return this.client.post(this.path, request).then(function (r) {
            return r.data.load_balancer;
        });
    };
    LoadBalancers.prototype.getById = function (lbId) {
        var uri = this.path + "/" + lbId;
        return this.client.get(uri).then(function (r) {
            return r.data.load_balancer;
        });
    };
    LoadBalancers.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.load_balancers;
        });
    };
    LoadBalancers.prototype.update = function (lbId, request) {
        var uri = this.path + "/" + lbId;
        return this.client.put(uri, request).then(function (r) {
            return r.data.load_balancer;
        });
    };
    LoadBalancers.prototype["delete"] = function (lbId) {
        var uri = this.path + "/" + lbId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    LoadBalancers.prototype.addDroplets = function (lbId, dropletIds) {
        var uri = this.path + "/" + lbId + "/droplets";
        return this.client.post(uri, { droplet_ids: dropletIds }).then(function (r) {
            return r.status;
        });
    };
    LoadBalancers.prototype.removeDroplets = function (lbId, dropletIds) {
        var uri = this.path + "/" + lbId + "/droplets";
        return this.client["delete"](uri, { data: { droplet_ids: dropletIds } }).then(function (r) {
            return r.data.status;
        });
    };
    LoadBalancers.prototype.addForwardingRules = function (lbId, forwardingRules) {
        var uri = this.path + "/" + lbId + "/forwarding_rules";
        return this.client.post(uri, { forwarding_rules: forwardingRules }).then(function (r) {
            return r.status;
        });
    };
    LoadBalancers.prototype.removeForwardingRules = function (lbId, forwardingRules) {
        var uri = this.path + "/" + lbId + "/forwarding_rules";
        return this.client["delete"](uri, { data: { forwarding_rules: forwardingRules } }).then(function (r) {
            return r.status;
        });
    };
    return LoadBalancers;
}());
exports["default"] = LoadBalancers;
