async function symbolSearchHelper (symbol) {
    try {
        const resp = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.API_KEY}`);
        const data = await resp.json();
    
        return data;
    } catch (error) {
        return error;
    }
}

module.exports = {
    symbolSearchHelper,
}