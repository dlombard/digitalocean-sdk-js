"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var Images = /** @class */ (function () {
    function Images(oauthClient) {
        this.path = '/images';
        this.client = oauthClient;
    }
    Images.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    Images.prototype.distributions = function () {
        return this.executeByType('distribution');
    };
    Images.prototype.applications = function () {
        return this.executeByType('application');
    };
    Images.prototype.private = function () {
        return this.executeByType('private');
    };
    Images.prototype.actions = function (imageId) {
        var uri = this.path + "/" + imageId + "/actions";
        var cursor = new DOCursor_1["default"](this.client, uri, undefined, 40);
        return cursor;
    };
    Images.prototype.getById = function (imageId) {
        var uri = this.path + "/" + imageId;
        return this.client.get(uri).then(function (r) {
            return r.data.image;
        });
    };
    Images.prototype.getByslug = function (slug) {
        var uri = this.path + "/" + slug;
        return this.client.get(uri).then(function (r) {
            return r.data.image;
        });
    };
    Images.prototype.update = function (imageId, name) {
        var uri = this.path + "/" + imageId;
        return this.client.put(uri, { name: name }).then(function (r) {
            return r.data.image;
        });
    };
    Images.prototype["delete"] = function (imageId) {
        var uri = this.path + "/" + imageId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    Images.prototype.executeByType = function (type) {
        var params = {};
        if (type === 'private') {
            params = { private: true };
        }
        else {
            params = { type: type };
        }
        var cursor = new DOCursor_1["default"](this.client, this.path, params, 40);
        return cursor;
    };
    return Images;
}());
exports["default"] = Images;
