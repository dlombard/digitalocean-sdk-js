"use strict";
exports.__esModule = true;
var DOCursor_1 = require("./utils/DOCursor");
var Actions = /** @class */ (function () {
    function Actions(oauthClient) {
        this.path = '/actions';
        this.client = oauthClient;
    }
    Actions.prototype.get = function () {
        var cursor = new DOCursor_1["default"](this.client, this.path, undefined, 40);
        return cursor;
    };
    Actions.prototype.getById = function (actionId) {
        var uri = "/" + this.path + "/" + actionId;
        return this.client.get(uri).then(function (r) {
            return r.data.action;
        });
    };
    return Actions;
}());
exports["default"] = Actions;
