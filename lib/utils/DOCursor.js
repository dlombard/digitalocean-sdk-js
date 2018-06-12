"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var DOCursor = /** @class */ (function () {
    function DOCursor(oauthClient, uri, params, batchSize) {
        this.currentPage = 0;
        this.total = 0;
        this.node = {
            payload: null,
            next: null,
            prev: null
        };
        this.batchSize = batchSize ? batchSize : 25;
        this.client = oauthClient;
        this.uri = uri;
        this.params = params ? params : {};
    }
    DOCursor.prototype.next = function () {
        if (this.currentPage == 0) {
            return this.execute(__assign({}, this.params, { per_page: this.batchSize }));
        }
        else {
            if (this.hasNext()) {
                this.currentPage += 1;
                this.uri = this.node.next;
                return this.execute(__assign({}, this.params));
            }
            return Promise.resolve([]);
        }
    };
    DOCursor.prototype.prev = function () {
        if (this.hasPrev()) {
            this.currentPage += 1;
            this.uri = this.node.prev;
            return this.execute(__assign({}, this.params));
        }
        return Promise.resolve([]);
    };
    DOCursor.prototype.hasNext = function () {
        if (this.node.next) {
            return true;
        }
        return false;
    };
    DOCursor.prototype.hasPrev = function () {
        if (this.node.prev) {
            return true;
        }
        return false;
    };
    DOCursor.prototype.execute = function (params) {
        var _this = this;
        return this.client.get(this.uri, { params: params }).then(function (res) {
            if (res.data.links.next) {
                _this.node.next = res.data.links.next;
            }
            if (res.data.links.prev) {
                _this.node.prev = res.data.links.prev;
            }
            _this.total = res.data.meta.total;
            delete res.data.links;
            delete res.data.meta;
            return res.data[Object.keys(res.data)[0]];
        });
    };
    return DOCursor;
}());
exports["default"] = DOCursor;
