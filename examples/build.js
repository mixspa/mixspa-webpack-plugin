var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

const examples = fs.readdirSync(__dirname).filter(file => fs.statSync(path.join(__dirname, file)).isDirectory());

examples.forEach(exampleName => {
  const examplePath = path.join(__dirname, exampleName);
  const configFile = path.join(examplePath, 'webpack.config.js');
  const config = require(configFile);

  webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  });
});