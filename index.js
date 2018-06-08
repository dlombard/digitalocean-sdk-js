"use strict";
exports.__esModule = true;
var do_1 = require("./lib/do");
var httpclient_1 = require("./lib/http/httpclient");
function init(apiToken) {
    var httpClient = httpclient_1["default"](apiToken);
    var doClient = new do_1["default"](httpClient);
    return doClient;
}
exports.init = init;
