"use strict";
exports.__esModule = true;
var SSHKeys = /** @class */ (function () {
    function SSHKeys(oauthClient) {
        this.path = '/account/keys';
        this.client = oauthClient;
    }
    SSHKeys.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.ssh_keys;
        });
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
    return SSHKeys;
}());
exports["default"] = SSHKeys;
