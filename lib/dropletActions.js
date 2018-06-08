"use strict";
exports.__esModule = true;
var dropletActions;
(function (dropletActions) {
    dropletActions[dropletActions["enable_backups"] = 0] = "enable_backups";
    dropletActions[dropletActions["disable_backups"] = 1] = "disable_backups";
})(dropletActions || (dropletActions = {}));
var DropletActions = /** @class */ (function () {
    function DropletActions(oauthClient) {
        this.path = '/droplets';
        this.client = oauthClient;
    }
    DropletActions.prototype.execute = function (dropletId, request) {
        var uri = this.path + "/" + dropletId + "/actions";
        return this.client.post(uri, request).then(function (r) {
            return r.data.action;
        });
    };
    DropletActions.prototype.executeByTag = function (tag, request) {
        var uri = this.path + "/actions";
        return this.client.post(this.path, request, { params: { tag_name: tag } }).then(function (r) {
            return r.data.action;
        });
    };
    DropletActions.prototype.enableBackups = function (dropletId) {
        var request = { type: 'enable_backups' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.disableBackups = function (dropletId) {
        var request = { type: 'disable_backups' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.reboot = function (dropletId) {
        var request = { type: 'reboot' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.powerCycle = function (dropletId) {
        var request = { type: 'power_cycle' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.shutdown = function (dropletId) {
        var request = { type: 'shutdown' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.powerOff = function (dropletId) {
        var request = { type: 'power_off' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.powerOn = function (dropletId) {
        var request = { type: 'power_on' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.restore = function (dropletId, image) {
        var request = { type: 'restore', image: image };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.passwordReset = function (dropletId) {
        var request = { type: 'password_reset' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.resize = function (dropletId, size, disk) {
        var _disk = disk;
        if (!disk) {
            _disk = false;
        }
        var request = { type: 'resize', size: size, disk: _disk };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.rebuild = function (dropletId, image) {
        var request = { type: 'rebuild', image: image };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.rename = function (dropletId, name) {
        var request = { type: 'rename', name: name };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.changeKernel = function (dropletId, kernel) {
        var request = { type: 'change_kernel', kernel: kernel };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.enableIPV6 = function (dropletId) {
        var request = { type: 'enable_ipv6' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.enablePrivateNetworking = function (dropletId) {
        var request = { type: 'enable_private_networking' };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.snapshot = function (dropletId, name) {
        var request = { type: 'snapshot', name: name };
        return this.execute(dropletId, request);
    };
    DropletActions.prototype.retrieve = function (dropletId, actionId) {
        var uri = this.path + "/" + dropletId + "/actions/" + actionId;
        return this.client.get(uri).then(function (r) {
            return r.data.action;
        });
    };
    // By Tag
    DropletActions.prototype.powerCycleByTag = function (tag) {
        var request = { type: 'power_cycle' };
        return this.executeByTag(tag, request);
    };
    DropletActions.prototype.shutdownByTag = function (tag) {
        var request = { type: 'shutdown' };
        return this.executeByTag(tag, request);
    };
    DropletActions.prototype.powerOffByTag = function (tag) {
        var request = { type: 'power_off' };
        return this.executeByTag(tag, request);
    };
    DropletActions.prototype.powerOnByTag = function (tag) {
        var request = { type: 'power_on' };
        return this.executeByTag(tag, request);
    };
    DropletActions.prototype.enableBackupsByTag = function (tag) {
        var request = { type: 'enable_backups' };
        return this.executeByTag(tag, request);
    };
    DropletActions.prototype.disableBackupsByTag = function (tag) {
        var request = { type: 'disable_backups' };
        return this.executeByTag(tag, request);
    };
    DropletActions.prototype.enableIPV6ByTag = function (tag) {
        var request = { type: 'enable_ipv6' };
        return this.executeByTag(tag, request);
    };
    DropletActions.prototype.enablePrivateNetworkingByTag = function (tag) {
        var request = { type: 'enable_private_networking' };
        return this.executeByTag(tag, request);
    };
    return DropletActions;
}());
exports["default"] = DropletActions;
