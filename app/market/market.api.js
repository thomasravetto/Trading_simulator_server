const express = require('express');

const marketRouter = express.Router();

const { loadAssetData, searchSymbol, getLatestData } = require('./market.controller');

marketRouter.post('/load_asset', loadAssetData);
marketRouter.post('/symbol_search', searchSymbol);
marketRouter.post('/get_latest_data', getLatestData);

module.exports =  marketRouter;