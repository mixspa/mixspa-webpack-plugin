# mixspa-webpack-plugin
Mixspa-Webpack-Plugin is a plugin for generate app info

## Current Status:

[![NPM Version](https://img.shields.io/npm/v/@mixspa/webpack-plugin.svg)](https://npmjs.org/package/@mixspa/webpack-plugin)
[![NPM Downloads](https://img.shields.io/npm/dm/@mixspa/webpack-plugin.svg)](https://npmjs.org/package/@mixspa/webpack-plugin)
[![Build Status](https://circleci.com/gh/mixspa/mixspa-webpack-plugin.svg?style=svg)](https://circleci.com/gh/mixspa/mixspa-webpack-plugin)

[![NPM](https://nodei.co/npm/@mixspa/webpack-plugin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@mixspa/webpack-plugin/)

## What it come from?

Pleas reference here: [mixspa-core](https://github.com/mixspa/mixspa-core)

## Install

```sh
  npm i --save-dev @mixspa/webpack-plugin
```

```sh
  yarn add --dev @mixspa/webpack-plugin
```

## Usage this plugin in webpack config

This plugin will generate an app info file for you that includes app basic info and assets. Just add the plugin to your webpack config as follows:

**webpack.config.js**

```js
const MixspaWebpackPlugin = require('@mixspa/webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new MixspaWebpackPlugin({
      id: 'mixspa-id',
      tag: 'mixspa-tag',
      filename: 'app.json',
      publicUrl: 'http://www.example.com/dev/'
    })
  ]
}
```

This will generate a file `dist/app.json` as follows:

```json
{
  "id": "mixspa-id",
  "tag": "mixspa-tag",
  "assets": ["http://www.example.com/dev/bundle.js"]
}
```

## Options

You can pass the configuration options with the following values:

|   Name    |   Type   |    Default    | Description  |
|-----------|----------|---------------|--------------|
| id        |  String  | `app-id`      | The id to use for unique id for this mixspa |
| tag       |  String  | `app-tag`     | The tag to use for render this mixspa in html file |
| fileName  |  String  | `app.json`    | The file include all inforamtion of this mixspa |
| publicUrl |  String  | `''`          | The base url for this mixspa assets published to |

## License

mixspa-webpack-plugin is released under the [MIT license](https://github.com/mixspa/mixspa-webpack-plugin/blob/master/LICENSE).
