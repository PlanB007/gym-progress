'use strict';

var _getSheetDone = require('get-sheet-done');

var _getSheetDone2 = _interopRequireDefault(_getSheetDone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('script file working');

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1YlxxDzUQzca-4dpiiXyhi2T6eB-2_V8s4U3ZRnnCfaU/edit#gid=0';

_getSheetDone2.default.raw(publicSpreadsheetUrl).then(function (sheet) {
    console.log(sheet);
});