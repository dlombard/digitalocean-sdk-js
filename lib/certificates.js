"use strict";
exports.__esModule = true;
var Certificates = /** @class */ (function () {
    function Certificates(oauthClient) {
        this.path = '/certificates';
        this.client = oauthClient;
    }
    Certificates.prototype.create = function (request) {
        return this.client.post(this.path, request).then(function (r) {
            return r.data.certificate;
        });
    };
    Certificates.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            return r.data.certificates;
        });
    };
    Certificates.prototype.getById = function (certifcateId) {
        var uri = this.path + "/" + certifcateId;
        return this.client.get(uri).then(function (r) {
            return r.data.certificate;
        });
    };
    Certificates.prototype["delete"] = function (certifcateId) {
        var uri = this.path + "/" + certifcateId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    return Certificates;
}());
exports["default"] = Certificates;
