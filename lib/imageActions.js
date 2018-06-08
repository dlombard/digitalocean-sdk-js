"use strict";
exports.__esModule = true;
var ImageActions = /** @class */ (function () {
    function ImageActions(oauthClient) {
        this.path = '/images';
        this.client = oauthClient;
    }
    ImageActions.prototype.transfer = function (imageId, region) {
        var uri = this.path + "/" + imageId + "/actions";
        return this.client.post(uri, { type: 'transfer', region: region }).then(function (r) {
            return r.data.actions;
        });
    };
    ImageActions.prototype.convertToSnapshot = function (imageId) {
        var uri = this.path + "/" + imageId + "/actions";
        return this.client.post(uri, { type: 'convert' }).then(function (r) {
            return r.data.actions;
        });
    };
    ImageActions.prototype.get = function (imageId, actionId) {
        var uri = this.path + "/" + imageId + "/actions/" + actionId;
        return this.client.get(uri).then(function (r) {
            return r.data.action;
        });
    };
    return ImageActions;
}());
exports["default"] = ImageActions;
