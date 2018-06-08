"use strict";
exports.__esModule = true;
var Images = /** @class */ (function () {
    function Images(oauthClient) {
        this.path = '/images';
        this.client = oauthClient;
    }
    Images.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.images;
        });
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
        return this.client.get(uri).then(function (r) {
            return r.data.actions;
        });
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
        return this.client.get(this.path, { params: params }).then(function (r) {
            return r.data.images;
        });
    };
    return Images;
}());
exports["default"] = Images;
