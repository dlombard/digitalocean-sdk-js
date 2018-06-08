"use strict";
exports.__esModule = true;
var VolumesActions = /** @class */ (function () {
    function VolumesActions(oauthClient) {
        this.path = '/volumes';
        this.client = oauthClient;
    }
    VolumesActions.prototype.attach = function (volumeId, dropletId, region) {
        var uri = this.path + "/" + volumeId + "/actions";
        var request = {
            type: 'attach',
            droplet_id: dropletId,
            region: region ? region : null
        };
        return this.client.post(uri, request).then(function (r) {
            return r.data.action;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    VolumesActions.prototype.attachByName = function (dropletId, volumeName, region) {
        var uri = this.path + "/actions";
        var request = {
            type: 'attach',
            droplet_id: dropletId,
            volume_name: volumeName,
            region: region ? region : null
        };
        return this.client.post(uri, request).then(function (r) {
            return r.data.action;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    VolumesActions.prototype.detach = function (volumeId, dropletId, region) {
        var uri = this.path + "/" + volumeId + "/actions";
        var request = {
            type: 'detach',
            droplet_id: dropletId,
            region: region ? region : null
        };
        return this.client.post(uri, request).then(function (r) {
            return r.data.action;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    VolumesActions.prototype.detachByName = function (dropletId, volumeName, region) {
        var uri = this.path + "/actions";
        var request = {
            type: 'detach',
            droplet_id: dropletId,
            volume_name: volumeName,
            region: region ? region : null
        };
        return this.client.post(uri, request).then(function (r) {
            return r.data.action;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    VolumesActions.prototype.resize = function (volumeId, size_gigabytes, region) {
        var uri = this.path + "/" + volumeId + "/actions";
        var request = {
            type: 'resize',
            size_gigabytes: size_gigabytes,
            region: region ? region : null
        };
        return this.client.post(uri, request).then(function (r) {
            return r.data.action;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    VolumesActions.prototype.get = function (volumeId, actionId) {
        var uri = this.path + "/" + volumeId + "/actions/" + actionId;
        return this.client.get(uri).then(function (r) {
            return r.data.action;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    VolumesActions.prototype.getActions = function (volumeId) {
        var uri = this.path + "/" + volumeId + "/actions";
        return this.client.get(uri).then(function (r) {
            var actions = r.data.actions;
            return actions;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    return VolumesActions;
}());
exports["default"] = VolumesActions;
