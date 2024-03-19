const { addAssetIntoDatabase, removeAsseFromDatabase, loadWatchlistFromDatabase } = require('../../app/watchlist/watchlist.data-access');

async function addAssetToWatchlistHelper (user_id, asset_symbol, asset_name) {
    const newWatchlist = await addAssetIntoDatabase(user_id, asset_symbol, asset_name);

    if (newWatchlist.length > 0) {
        return newWatchlist[0];
    } else {
        return { error: 'Asset not added' };
    }
}

async function removeAssetFromWatchlistHelper (user_id, asset_symbol, asset_name) {
    const deletedAsset = await removeAsseFromDatabase(user_id, asset_symbol, asset_name);

    if (deletedAsset === 1) {
        return deletedAsset;
    } else {
        return { error: 'Asset not removed' };
    }
}

async function loadWatchlistHelper (user_id) {
    const userWatchlist = await loadWatchlistFromDatabase(user_id);

    if (userWatchlist.length > 0) {
        return userWatchlist;
    } else {
        return { error: 'Error retrieving watchlist' };
    }
}

async function loadAssetsPricesHelper (user_id) {
    const userWatchlist = await loadWatchlistFromDatabase(user_id);

    const promises = userWatchlist.map(async function (asset) {
        // Asset needed in 60min timeframe and in compact form
        const response = await fetchAssetData(asset.asset_symbol, '60min', 'compact');

        delete response.metadata["1. Information"];
        const metadata = Object.assign({"1. Name": asset.asset_name}, response.metadata);
        response.metadata = metadata;

        return response;
    })

    const assetsData = await Promise.all(promises);

    if (assetsData.length > 0) {
        return assetsData;
    } else {
        return { error: 'Error retrieving prices' };
    }
}


// Function modified to be used both in watchlist and market
async function fetchAssetData (asset_symbol, interval, outputsize, fullData=false) {
    let data;
    const intervalType = {
        '30min': {
            func: 'TIME_SERIES_INTRADAY',
            interval: '30min'
        },
        '60min': {
            func: 'TIME_SERIES_INTRADAY',
            interval: '60min'
        },
        'daily': {
            func: 'TIME_SERIES_DAILY'
        },
        'weekly': {
            func: 'TIME_SERIES_WEEKLY'
        }
    }

    if (interval === '30min' || interval === '60min') {
        const resp = await fetch(`https://www.alphavantage.co/query?function=${intervalType[interval].func}&symbol=${asset_symbol}&outputsize=${outputsize}&interval=${intervalType[interval].interval}&apikey=${process.env.API_KEY}`);
        data = await resp.json();
    } else if (interval === 'daily' || interval === 'weekly') {
;       const resp = await fetch(`https://www.alphavantage.co/query?function=${intervalType[interval].func}&symbol=${asset_symbol}&outputsize=${outputsize}&apikey=${process.env.API_KEY}`);
        data = await resp.json();
    } else {
        return false;
    }


    const keys = Object.keys(data);
    let last24HElements = [];

    if (!fullData) {
        last24HElements = Object.entries(data[keys[1]]).slice(0, 17);
    }

    const response = {
        "metadata": data[keys[0]],
        "prices": (!fullData ? last24HElements : Object.entries(data[keys[1]]).slice(0, 250))
    }

    return response;
}

module.exports = {
    addAssetToWatchlistHelper,
    removeAssetFromWatchlistHelper,
    loadWatchlistHelper,
    loadAssetsPricesHelper,
    fetchAssetData
}