async function symbolSearchHelper (symbol) {
    try {
        const resp = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.API_KEY}`);
        const data = await resp.json();

        return data;
    } catch (error) {
        return error;
    }
}

async function getLatestDataHelper (asset_symbols) {
    try {
        // Promise.all waits for all promises to get resolved before returning the array
        let latestData = await Promise.all(asset_symbols.map(async (asset) => {

            const resp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${asset}&apikey=${process.env.API_KEY}`);
            const data = await resp.json();
    
            const latestAssetData = {
                'symbol': data['Global Quote']['01. symbol'],
                'price': data['Global Quote']['05. price']
            }
    
            return latestAssetData;
        }));

        return latestData;
    } catch (error) {
        return error;
    }
}

module.exports = {
    symbolSearchHelper,
    getLatestDataHelper
}