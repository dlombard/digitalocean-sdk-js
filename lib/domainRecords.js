"use strict";
exports.__esModule = true;
var DomainRecords = /** @class */ (function () {
    function DomainRecords(oauthClient) {
        this.path = '/domains';
        this.client = oauthClient;
    }
    DomainRecords.prototype.get = function (name) {
        var uri = this.path + "/" + name + "/records";
        return this.client.get(uri).then(function (r) {
            return r.data.domain_records;
        });
    };
    DomainRecords.prototype.getById = function (name, recordId) {
        var uri = this.path + "/" + name + "/records/" + recordId;
        return this.client.get(uri).then(function (r) {
            return r.data.domain_record;
        });
    };
    DomainRecords.prototype["delete"] = function (name, recordId) {
        var uri = this.path + "/" + name + "/records/" + recordId;
        return this.client["delete"](uri).then(function (r) {
            return r.status;
        });
    };
    DomainRecords.prototype.create = function (name, request) {
        var uri = this.path + "/" + name + "/records";
        return this.client.post(uri, request).then(function (r) {
            return r.data.domain_record;
        });
    };
    DomainRecords.prototype.update = function (name, recordId, request) {
        var uri = this.path + "/" + name + "/records/" + recordId;
        return this.client.put(uri, request).then(function (r) {
            return r.data.domain_record;
        });
    };
    return DomainRecords;
}());
exports["default"] = DomainRecords;
