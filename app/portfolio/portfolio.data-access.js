const db = require('../../helpers/db_connection/db');

async function performTransactionIntoDatabase (user_id, asset_symbol, asset_name, operation, quantity, price) {
    try {
        if (operation === 'sell' && !price) {
            return await performSellingOperation(user_id, asset_symbol, asset_name, quantity);
        } else if (operation === 'buy' && price || operation === 'short' && price) {
            return await performBuyingOrShortingOperation(user_id, asset_symbol, asset_name, operation, quantity, price)
        }
    } catch (error) {
        return error;
    }
}

async function performBuyingOrShortingOperation (user_id, asset_symbol, asset_name, operation, quantity, price) {
    try {
        const operation_price = price * quantity;

        return db.transaction(async trx => {
            const boughtAsset = await trx('transactions')
            .returning('*')
            .insert({
                user_id: user_id,
                asset_symbol: asset_symbol,
                asset_name: asset_name,
                transaction_type: operation,
                quantity: quantity,
                price: price,
                timestamp: new Date().toUTCString()
            });

            const updatedUserBalance = await trx('users')
            .decrement('balance', operation_price)
            .where({
                id: user_id
            });

            if(await assetExistsInPortfolio(user_id, asset_symbol)) {
                const updatedPortfolio = await trx('portfolio')
                .increment('quantity', quantity)
                .where({
                    user_id: user_id,
                    asset_symbol: asset_symbol
                })
            } else {
                const updatedPortfolio = await trx('portfolio')
                .returning('*')
                .insert({
                    user_id: user_id,
                    asset_symbol: asset_symbol,
                    asset_name: asset_name,
                    quantity: quantity
                })
            }

            return boughtAsset;
        })
    } catch (error) {
        return error;
    }
}

async function performSellingOperation (user_id, asset_symbol, quantity) {

}

// retrieves transaction of a given user from its id
async function getAllTransactionsFromDatabase (user_id) {
    try {
        const transactions = await db('transactions')
        .returning('*')
        .where({
            user_id: user_id
        });

        return transactions;
    } catch (error) {
        return error;
    }
}

async function getTransactionsForAssetFromDatabase (user_id, asset_symbol) {
    try {
        const transactions = await db('transactions')
        .returning('*')
        .where({
            user_id: user_id,
            asset_symbol: asset_symbol
        });

        return transactions;
    } catch (error) {
        return error;
    }
}

async function getUserPortfolioFromDatabase (user_id) {
    try {
        const userPortfolio = db('portfolio')
        .select('*')
        .where({
            user_id: user_id,
        })

        return userPortfolio;
    } catch (error) {
        return error;
    }
}

// checks if an asset is already in the given user's portfolio
async function assetExistsInPortfolio (user_id, asset_symbol) {
    const assetExists = await db('portfolio')
    .select('*')
    .where({
        user_id: user_id,
        asset_symbol: asset_symbol
    })

    return assetExists.length > 0;
}

module.exports = {
    performTransactionIntoDatabase,
    getAllTransactionsFromDatabase,
    getTransactionsForAssetFromDatabase,
    getUserPortfolioFromDatabase
}