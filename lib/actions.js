"use strict";
exports.__esModule = true;
var Actions = /** @class */ (function () {
    function Actions(oauthClient) {
        this.path = '/actions';
        this.client = oauthClient;
    }
    Actions.prototype.get = function () {
        return this.client.get(this.path).then(function (r) {
            var actions = r.data.actions;
            return actions;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Actions.prototype.getById = function (actionId) {
        var uri = "/" + this.path + "/" + actionId;
        return this.client.get(uri).then(function (r) {
            return r.data.action;
        })["catch"](function (e) {
            console.error(e);
        });
    };
    return Actions;
}());
exports["default"] = Actions;
