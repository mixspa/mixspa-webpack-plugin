const fs = require("fs");
const path = require("path");

const pluginName = 'MixspaWebpackPlugin';

class MixspaWebpackPlugin {
  constructor(options) {
    const defaultOptions = {
      id: 'app-id',
      tag: 'app-tag',
      filename: 'app.json',
      publicUrl:''
    };
    this.options = Object.assign(defaultOptions, options || {});
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      this.writeAppInfo(compilation.options.output.path, this.getAppInfo(compilation));
      return callback();
    });
  }

  writeAppInfo(outputPath, appInfo) {
    let outputFileName = path.join(outputPath, this.options.filename);
    fs.mkdirSync(outputPath, { recursive: true })
    fs.writeFileSync(outputFileName, JSON.stringify(appInfo));
  }

  getAppInfo(compilation) {
    return {
      id: this.options.id, 
      tag: this.options.tag, 
      assets: this.getAssets(compilation)
    };
  }

  getAssets(compilation) {
    return compilation.getAssets().map(asset => this.options.publicUrl + asset.name);
  }
}

module.exports = MixspaWebpackPlugin;