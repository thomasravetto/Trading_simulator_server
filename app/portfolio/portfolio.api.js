const express = require('express');

const portfolioRouter = express.Router();

const { buyAsset, shortAsset, sellAsset, getAllTransactions, getTransactionsForAsset, getUserPortfolio } = require('./portfolio.controller');

portfolioRouter.post('/buy_asset', buyAsset);
portfolioRouter.post('/short_asset', shortAsset);
portfolioRouter.post('/sell_asset', sellAsset);
portfolioRouter.post('/get_all_transactions', getAllTransactions);
portfolioRouter.post('/get_transactions_for_asset', getTransactionsForAsset);
portfolioRouter.post('/get_user_portfolio', getUserPortfolio);

module.exports = portfolioRouter;