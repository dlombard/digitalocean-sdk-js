"use strict";
exports.__esModule = true;
var Domains = /** @class */ (function () {
    function Domains(oauthClient) {
        this.path = '/domains';
        this.client = oauthClient;
    }
    Domains.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.domains;
        });
    };
    Domains.prototype.create = function (name, ip_address) {
        return this.client.post(this.path, { name: name, ip_address: ip_address }).then(function (r) {
            return r.data.domains;
        });
    };
    Domains.prototype.getByName = function (name) {
        var uri = this.path + "/name";
        return this.client.get(uri).then(function (r) {
            return r.data.certificate;
        });
    };
    Domains.prototype["delete"] = function (name) {
        var uri = this.path + "/name";
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    return Domains;
}());
exports["default"] = Domains;
