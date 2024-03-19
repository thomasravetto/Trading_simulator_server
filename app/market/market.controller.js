const { fetchAssetData } = require('../../helpers/watchlist/watchlist.helper');
const { symbolSearchHelper } = require('../../helpers/market/market.helper');

async function loadAssetData (req, res) {
    try {
        const { asset_symbol, timeframe, outputsize, fullData } = req.body;

        // Using fetchAssetData from watchlist.helper.js to fetch data
        const assetData = await fetchAssetData(asset_symbol, timeframe, outputsize, fullData);

        res.status(200).json(assetData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function searchSymbol (req, res) {
    try {
        const { symbol } = req.body;

        const assetsList = await symbolSearchHelper(symbol);

        res.status(200).json(assetsList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loadAssetData,
    searchSymbol
}