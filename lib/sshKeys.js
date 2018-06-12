"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var SSHKeys = /** @class */ (function () {
    function SSHKeys(oauthClient) {
        this.path = '/account/keys';
        this.client = oauthClient;
    }
    SSHKeys.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    SSHKeys.prototype.create = function (name, public_key) {
        return this.client.post(this.path, { name: name, public_key: public_key }).then(function (r) {
            return r.data.ssh_key;
        });
    };
    SSHKeys.prototype.getById = function (sshKeyId) {
        var uri = this.path + "/" + sshKeyId;
        return this.client.get(uri).then(function (r) {
            return r.data.ssh_key;
        });
    };
    SSHKeys.prototype.getByFingerprint = function (fingerprint) {
        var uri = this.path + "/" + fingerprint;
        return this.client.get(uri).then(function (r) {
            return r.data.ssh_key;
        });
    };
    SSHKeys.prototype.update = function (sshKeyId, name) {
        var uri = this.path + "/" + sshKeyId;
        return this.client.put(uri, { data: { name: name } }).then(function (r) {
            return r.data.ssh_key;
        });
    };
    SSHKeys.prototype.destroyById = function (sshKeyId) {
        var uri = this.path + "/" + sshKeyId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    SSHKeys.prototype.destroyByFingerprint = function (fingerprint) {
        var uri = this.path + "/" + fingerprint;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    SSHKeys.prototype.destroyByName = function (name) {
        var _this = this;
        return this.get().next().then(function (keys) {
            var key;
            if (keys) {
                keys.forEach(function (_key) {
                    if (_key.name === name) {
                        key = _key;
                    }
                });
            }
            return key;
        }).then(function (key) {
            if (key) {
                return _this.destroyById(key.id);
            }
            return;
        }).then(function (status) {
            return status;
        });
    };
    return SSHKeys;
}());
exports["default"] = SSHKeys;
