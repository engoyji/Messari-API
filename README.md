# Messari API Client for Node.js

<span class="badge-travisci"><a href="http://travis-ci.org/miscavage/Messari-API" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/miscavage/Messari-API/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/messari-api" title="View this project on NPM"><img src="https://img.shields.io/npm/v/messari-api.svg" alt="NPM version"/></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/messari-api" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/messari-api.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/miscavage/messari-api" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/miscavage/messari-api.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/miscavage/messari-api#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/miscavage/messari-api.svg" alt="Dev Dependency Status" /></a></span>

A Node.js wrapper for the Messari API with no dependencies.

## • Installation

Latest version: 1.0.0

`npm install messari-api`

## • Messari API Documentation

For complete API documentation, up-to-date parameters, responses and errors, please refer to https://messari.io/api

## • Quick Start Example

```javascript
//1. Import messari-api
const Messari = require('messari-api');

//2. Initiate the Messari API Client
const MessariClient = new Messari();

//3. Make calls
var func = async() => {
  let data = await MessariClient.markets.all();
};
```

___
## • Making Calls
All calls using the MessariClient are asynchronous.

All calls are returned in the following format:
```javascript
{
    success: Boolean,
    message: String,
    code: Number,
    data: Object
}
```

The MessariClient splits up the currently available calls outline in the official Messari API documentation into three parts.

| Namespace | Usage | Description |
| --- | --- | --- |
`markets` | `MessariClient.markets[...]` | Calls related to markets
`assets` | `MessariClient.assets[...]` | Calls related to assets
`news` | `MessariClient.news[...]` | Calls related to news

___
### • Markets
Calls related to markets.


#### `markets.all()`
Get the list of all exchanges and pairs that the Messari API supports.

Official documentation: https://messari.io/api/docs#operation/getAllMarkets

Usage Example:
```javascript
let data = await MessariClient.markets.all();
```

___
### • Assets
Calls related to assets.


#### `assets.all()`
Get the list of all crypto assets that the Messari API supports.

Official documentation: https://messari.io/api/docs#operation/getAllAssets

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.metrics`: `Boolean` - Filter results to those with metrics (quantitative)
- `params.profiles`: `Boolean` - Filter results to those with profiles (qualitative)

Usage Example:
```javascript
let data = await MessariClient.assets.all();

// With params:
let data = await MessariClient.assets.all({
  metrics: true,
  profiles: true,
});

```

___
#### `assets.fetchProfile()`
Get fundamental information by asset symbol.

Official documentation: https://messari.io/api/docs#operation/getProfileBySymbol

Params:

- `assetSymbol`: `String` - (Required) The asset symbol (can be obtained from `assets.all()`) eg. `btc`

Usage Example:
```javascript
let data = await MessariClient.assets.fetchProfile("btc");
```

___
#### `assets.fetchMetrics()`
Get quantitative metrics by asset symbol.

Official documentation: https://messari.io/api/docs#operation/getMetricsBySymbol

Params:

- `assetSymbol`: `String` - (Required) The asset symbol (can be obtained from `assets.all()`) eg. `btc`

Usage Example:
```javascript
let data = await MessariClient.assets.fetchMetrics("btc");
```

___
### • News
Calls related to news.


#### `news.all()`
Get the latest 50 curated articles of news and analysis for all assets

Official documentation: https://messari.io/api/docs#operation/getNews

Usage Example:
```javascript
let data = await MessariClient.news.all();
```

___
#### `news.fetchBySymbol()`
Get list of event countries.

Official documentation: https://messari.io/api/docs#operation/getNewsBySymbol

Params:

- `assetSymbol`: `String` - (Required) The asset symbol (can be obtained from `assets.all()`) eg. `btc`

Usage Example:
```javascript
let data = await MessaroClient.news.fetchBySymbol("btc");
```

## • Say Hi

Find me on Gab: [@markmiscavage](https://gab.com/markmiscavage).

Tweet at me: [@markmiscavage](https://twitter.com/markmiscavage).

## • License

MIT License

Copyright (c) 2019 Mark Miscavage

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
