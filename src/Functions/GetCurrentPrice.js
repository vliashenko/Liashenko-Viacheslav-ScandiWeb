
function GetCurrentPrice(prices,currentCurrencyValue) {
    return  prices.map(item => {
        if(item.currency.label === currentCurrencyValue) {
            return `${item.currency.symbol} ${item.amount}`
        } else {
            return null
        }
    })

};

export default GetCurrentPrice;
