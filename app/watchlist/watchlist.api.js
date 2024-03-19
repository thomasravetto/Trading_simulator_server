const express = require('express');

const watchlistRouter = express.Router();

const { addAssetToWatchlist, removeAssetFromWatchlist, loadWatchlist, loadAssetsPrices } = require('./watchlist.controller');

watchlistRouter.post('/add_asset', addAssetToWatchlist);
watchlistRouter.post('/remove_asset', removeAssetFromWatchlist);
watchlistRouter.post('/load_watchlist', loadWatchlist);
watchlistRouter.post('/load_assets_prices', loadAssetsPrices);

module.exports = watchlistRouter;