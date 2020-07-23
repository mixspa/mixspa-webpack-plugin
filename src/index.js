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
    compiler.hooks.emit.tapAsync(pluginName, (compilation) => {
      this.writeAppInfo(compilation.options.output.path, this.getAppInfo(compilation));
    });
  }

  writeAppInfo(outputPath, appInfo) {
    let outputFileName = path.join(outputPath, this.options.filename);
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
    return compilation.getAssets().map(a => this.options.publicUrl + a.name);
  }
}

module.exports = MixspaWebpackPlugin;