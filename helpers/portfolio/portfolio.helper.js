const { performTransactionIntoDatabase, getAllTransactionsFromDatabase, getTransactionsForAssetFromDatabase, getUserPortfolioFromDatabase } = require('../../app/portfolio/portfolio.data-access');
const { findUserById } = require('../../app/login/login.data-access');

async function buyAssetHelper (user_id, asset_symbol, asset_name, price, quantity) {
    const operation = 'buy';
    try {
        const totalCost = calculateTransactionCost(price, quantity);

        if (await isUserBalanceEnough(user_id, totalCost)) {
            const boughtAsset = await performTransactionIntoDatabase(user_id, asset_symbol, asset_name, operation, quantity, price);

            if (boughtAsset) {
                return boughtAsset[0];
            }
        } else {
            return { error: 'User balance is not enough to complete the transaction' }
        }

    } catch (error) {
        return error;
    }
}

async function shortAssetHelper (user_id, asset_symbol, asset_name, price, quantity) {
    const operation = 'short';
    try {
        const shortedAsset = await performTransactionIntoDatabase(user_id, asset_symbol, asset_name, operation, quantity, price);

        if (shortedAsset.length > 0) {
            return shortedAsset[0];
        } else {
            return shortedAsset
        }
    } catch (error) {
        return error;
    }
}

async function sellAssetHelper (user_id, asset_symbol, asset_name, price, quantity) {
    const operation = 'sell';
    try {
        const soldAsset = await performTransactionIntoDatabase(user_id, asset_symbol, asset_name, operation, quantity, price);
        
        if (soldAsset) {
            return soldAsset;
        } else if(soldAsset.error) {
            return soldAsset.error;
        }
    } catch (error) {
        return error;
    }
}

async function getAllTransactionsHelper (user_id) {
    try {
        const userTransactions = await getAllTransactionsFromDatabase(user_id);

        if (userTransactions.length > 0) {
            const transactionsHash = createHashWithTransactions(userTransactions);

            return transactionsHash;
        }
    } catch (error) {
        return error;
    }
}

async function getTransactionsForAssetHelper (user_id, asset_symbol) {
    try {
        const userTransactions = await getTransactionsForAssetFromDatabase(user_id, asset_symbol);

        if (userTransactions.length > 0) {
            return userTransactions;
        }
    } catch (error) {
        return error;
    }
}

async function getUserPortfolioHelper (user_id) {
    try {
        const userPortfolio = await getUserPortfolioFromDatabase(user_id);

        if (userPortfolio.length > 0) {
            return userPortfolio;
        } else {
            return [];
        }
    } catch (error) {
        return error;
    }
}

// checks if user has enough balance to perform a transaction
async function isUserBalanceEnough (user_id, price) {
    try {
        const user = await findUserById(user_id);
    
        const { balance } = await user[0];
    
        return balance >= price;
    } catch (error) {
        return error;
    }
}

function calculateTransactionCost (price, quantity) {
    return price * quantity;
}

// creates an hash table to organize all the transactions
function createHashWithTransactions (transactions) {
    let hash = {};
    for (let transaction of transactions) {
        if (hash[transaction.asset_symbol]) {
            hash[transaction.asset_symbol].push(transaction)
        } else {
            hash[transaction.asset_symbol] = [transaction];
        }
    }

    return hash;
}

module.exports = {
    buyAssetHelper,
    shortAssetHelper,
    sellAssetHelper,
    getAllTransactionsHelper,
    getTransactionsForAssetHelper,
    getUserPortfolioHelper
}