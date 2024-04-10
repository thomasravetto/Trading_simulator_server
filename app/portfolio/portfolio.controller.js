const { buyAssetHelper, shortAssetHelper, sellAssetHelper, getAllTransactionsHelper, getTransactionsForAssetHelper, getUserPortfolioHelper } = require('../../helpers/portfolio/portfolio.helper');

async function buyAsset (req, res) {
    try {
        const { user_id, asset_symbol, asset_name, price, quantity } = req.body;

        const assetBought = await buyAssetHelper(user_id, asset_symbol, asset_name, price, quantity);

        if (assetBought) {
            res.status(200).json(assetBought);
        } else {
            res.status(400).json(assetBought);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error buying asset' });
    }
}

async function shortAsset (req, res) {
    try {
        const { user_id, asset_symbol, asset_name, price, quantity } = req.body;

        const assetShorted = await shortAssetHelper(user_id, asset_symbol, asset_name, price, quantity);

        if (assetShorted) {
            res.status(200).json(assetShorted);
        } else {
            res.status(400).json(assetShorted);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function sellAsset (req, res) {
    try {
        const { user_id, asset_symbol, asset_name, price, quantity } = req.body;

        const assetSold = await sellAssetHelper(user_id, asset_symbol, asset_name, price, quantity);

        if (assetSold) {
            res.status(200).json(assetSold);
        } else {
            res.status(400).json(assetSold);
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Error selling asset' });
    }
}

async function getAllTransactions (req, res) {
    try {
        const {user_id} = req.body;

        const userTransactions = await getAllTransactionsHelper(user_id);

        if (userTransactions) {
            res.status(200).json(userTransactions);
        } else {
            res.status(400).json(userTransactions);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error retrieving transactions' });
    }
}

async function getTransactionsForAsset (req, res) {
    try {
        const {user_id, asset_symbol} = req.body;

        const userTransactions = await getTransactionsForAssetHelper(user_id, asset_symbol);

        if (userTransactions) {
            res.status(200).json(userTransactions);
        } else {
            res.status(400).json(userTransactions);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error retrieving transactions' });
    }
}

async function getUserPortfolio (req, res) {
    try {
        const { user_id } = req.body;

        const userPortfolio = await getUserPortfolioHelper(user_id);

        if (userPortfolio) {
            res.status(200).json(userPortfolio);
        } else {
            res.status(400).json(userPortfolio);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error retrieving portfolio' })
    }
}

module.exports = {
    buyAsset,
    shortAsset,
    sellAsset,
    getAllTransactions,
    getTransactionsForAsset,
    getUserPortfolio
}