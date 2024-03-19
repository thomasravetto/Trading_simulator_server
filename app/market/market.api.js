const express = require('express');

const marketRouter = express.Router();

const { loadAssetData, searchSymbol } = require('./market.controller');

marketRouter.post('/load_asset', loadAssetData);
marketRouter.post('/symbol_search', searchSymbol);

module.exports =  marketRouter;