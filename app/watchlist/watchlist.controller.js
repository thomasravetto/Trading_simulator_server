const { addAssetToWatchlistHelper, removeAssetFromWatchlistHelper, loadWatchlistHelper, loadAssetsPricesHelper } = require('../../helpers/watchlist/watchlist.helper');

async function addAssetToWatchlist (req, res) {
    try {
        const { user_id, asset_symbol, asset_name } = req.body;
    
        const newAsset = await addAssetToWatchlistHelper(user_id, asset_symbol, asset_name);
    
        res.status(200).json(newAsset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function removeAssetFromWatchlist (req, res) {
    try {
        const { user_id, asset_symbol, asset_name } = req.body;
    
        const removedAsset = await removeAssetFromWatchlistHelper(user_id, asset_symbol, asset_name);
    
        res.status(200).json(removedAsset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


async function loadWatchlist (req, res) {
    try {
        const { user_id } = req.body;

        const userWatchlist = await loadWatchlistHelper(user_id);

        res.status(200).json(userWatchlist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function loadAssetsPrices (req, res) {
    try {
        const { user_id } = req.body;

        const assetsPrices = await loadAssetsPricesHelper(user_id);

        res.status(200).json(assetsPrices);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    addAssetToWatchlist,
    removeAssetFromWatchlist,
    loadWatchlist,
    loadAssetsPrices
}