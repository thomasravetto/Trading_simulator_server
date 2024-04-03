async function symbolSearchHelper (symbol) {
    try {
        const resp = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.API_KEY}`);
        const data = await resp.json();

        return data;
    } catch (error) {
        return error;
    }
}

async function getLatestDataHelper (asset_symbol) {
    try {
        const resp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${asset_symbol}&apikey=${process.env.API_KEY}`);
        const data = await resp.json();

        const latestData = {
            'symbol': data['Global Quote']['01. symbol'],
            'price': data['Global Quote']['05. price']
        }

        return latestData;
    } catch (error) {
        return error;
    }
}

module.exports = {
    symbolSearchHelper,
    getLatestDataHelper
}