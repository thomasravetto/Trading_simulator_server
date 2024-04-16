const db = require('../../helpers/db_connection/db');

async function addAssetIntoDatabase (user_id, asset_symbol, asset_name) {
    try {
        const newAsset = await db('watchlist').insert({
            user_id: user_id,
            asset_symbol: asset_symbol,
            asset_name: asset_name
        }).returning('*');

        return newAsset;
    } catch (error) {
        return { error };
    }
}

async function removeAsseFromDatabase (user_id, asset_symbol, asset_name) {
    try {
        const deletedAsset = await db('watchlist').where({
            user_id: user_id,
            asset_symbol: asset_symbol,
            asset_name: asset_name
        }).del();

        return deletedAsset;
    } catch (error) {
        return { error };
    }
}

async function loadWatchlistFromDatabase (user_id) {
    try {
        const userWatchlist = await db.select('id', 'asset_symbol', 'asset_name')
        .from('watchlist')
        .where('user_id', `${user_id}`)
        .orderBy('id', 'desc');

        return userWatchlist;
    } catch (error) {
        return { error };
    }
}

module.exports = {
    addAssetIntoDatabase,
    removeAsseFromDatabase,
    loadWatchlistFromDatabase
}