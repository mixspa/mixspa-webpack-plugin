"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require("fs");

var path = require("path");

var pluginName = 'MixspaWebpackPlugin';

var MixspaWebpackPlugin = /*#__PURE__*/function () {
  function MixspaWebpackPlugin(options) {
    _classCallCheck(this, MixspaWebpackPlugin);

    var defaultOptions = {
      id: 'app-id',
      tag: 'app-tag',
      filename: 'app.json',
      publicPath: ''
    };
    this.options = Object.assign(defaultOptions, options || {});
  }

  _createClass(MixspaWebpackPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.emit.tapAsync(pluginName, function (compilation) {
        _this.writeAppInfo(compilation.options.output.path, _this.getAppInfo(compilation));
      });
    }
  }, {
    key: "writeAppInfo",
    value: function writeAppInfo(outputPath, appInfo) {
      var outputFileName = path.join(outputPath, this.options.filename);
      fs.writeFileSync(outputFileName, JSON.stringify(appInfo));
    }
  }, {
    key: "getAppInfo",
    value: function getAppInfo(compilation) {
      return {
        id: this.options.id,
        tag: this.options.tag,
        assets: this.getAssets(compilation)
      };
    }
  }, {
    key: "getAssets",
    value: function getAssets(compilation) {
      var _this2 = this;

      return compilation.getAssets().map(function (a) {
        return _this2.options.publicPath + a.name;
      });
    }
  }]);

  return MixspaWebpackPlugin;
}();

module.exports = MixspaWebpackPlugin;