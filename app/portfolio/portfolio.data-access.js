const db = require('../../helpers/db_connection/db');

async function performTransactionIntoDatabase (user_id, asset_symbol, asset_name, operation, quantity, price) {
    try {
        if (operation === 'sell' && price) {
            return await performSellingOperation(user_id, asset_symbol, asset_name, quantity, price);
        } else if (operation === 'buy' && price || operation === 'short' && price) {
            return await performBuyingOrShortingOperation(user_id, asset_symbol, asset_name, operation, quantity, price)
        }
    } catch (error) {
        return { error: error.message };
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

            if((await assetExistsInPortfolio(user_id, asset_symbol)).length > 0) {
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
        return { error: error.message };
    }
}

async function performSellingOperation (user_id, asset_symbol, asset_name, quantity, price) {
    try {
        const operation_price = price * quantity;

        return db.transaction(async trx => {
            // Insert transaction record
            const sellAsset = await trx('transactions')
            .returning('*')
            .insert({
                user_id: user_id,
                asset_symbol: asset_symbol,
                asset_name: asset_name,
                transaction_type: 'sell',
                quantity: quantity,
                price: price,
                timestamp: new Date().toUTCString()
            });

            // Update user balance
            const updatedUserBalance = await trx('users')
            .increment('balance', operation_price)
            .where({
                id: user_id
            });

            // Check if an asset exista in portfolio
            const assetExists = await assetExistsInPortfolio(user_id, asset_symbol);
            if (assetExists.length === 0 || parseFloat(assetExists[0].quantity) < parseFloat(quantity)) {
                throw new Error('Insufficient quantity to sell');
            }

            // Update portfolio based on quantity
            if (assetExists[0].quantity > quantity) {
                console.log('ciao')
                    await trx('portfolio')
                    .decrement('quantity', quantity)
                    .where({
                        user_id: user_id,
                        asset_symbol: asset_symbol
                    })
                } else {
                    console.log('canc')
                    await trx('portfolio')
                    .where({
                        user_id: user_id,
                        asset_symbol: asset_symbol,
                    }).del();
                }

            return sellAsset;
        })
    } catch (error) {
        return { error: error.message };
    }
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
        return { error: error.message };
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
        return { error: error.message };
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
        return { error: error.message };
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

    return assetExists;
}

module.exports = {
    performTransactionIntoDatabase,
    getAllTransactionsFromDatabase,
    getTransactionsForAssetFromDatabase,
    getUserPortfolioFromDatabase
}