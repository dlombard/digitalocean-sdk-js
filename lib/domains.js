"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var Domains = /** @class */ (function () {
    function Domains(oauthClient) {
        this.path = '/domains';
        this.client = oauthClient;
    }
    Domains.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
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
