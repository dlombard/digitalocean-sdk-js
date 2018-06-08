"use strict";
exports.__esModule = true;
var Tags = /** @class */ (function () {
    function Tags(oauthClient) {
        this.path = '/tags';
        this.client = oauthClient;
    }
    Tags.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.ssh_keys;
        });
    };
    Tags.prototype.create = function (name) {
        return this.client.post(this.path, { name: name }).then(function (r) {
            return r.data.tag;
        });
    };
    Tags.prototype.getByName = function (tagName) {
        var uri = this.path + "/" + tagName;
        return this.client.get(uri).then(function (r) {
            return r.data.tag;
        });
    };
    Tags.prototype.tag = function (tagName, resources) {
        var uri = this.path + "/" + tagName + "/resources";
        return this.client.post(uri, { resources: resources }).then(function (r) {
            return r.data.tag;
        });
    };
    Tags.prototype.untag = function (tagName, resources) {
        var uri = this.path + "/" + tagName + "/resources";
        return this.client["delete"](uri, { data: { resources: resources } }).then(function (r) {
            return r.status;
        });
    };
    Tags.prototype["delete"] = function (tagName) {
        var uri = this.path + "/" + tagName;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    return Tags;
}());
exports["default"] = Tags;
