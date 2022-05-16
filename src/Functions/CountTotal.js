

function CountTotal(inCartProp, currencyProp)  {
    let ans = [];
    let itemsAmount = [];
    let tax = [];
    inCartProp.map(el => {
        let realprice;
        return el.prices.forEach(item => {
            if(item.currency.label === currencyProp) {
               realprice =  item.amount * ( 1 + 21 / 100 ) * el.quantity
               ans.push(realprice)
               itemsAmount.push(el.quantity)
               tax.push(((item.amount /100) *21) * el.quantity)
            }
        })
    })
    let totalTax =  tax.reduce((acc,curr) => {
        acc+= curr   
        return acc    
    },0).toFixed(2);

    let totalAmount =  itemsAmount.reduce((acc,curr) => {
        acc+= curr   
        return acc    
    },0)
    
    let totalPrice = ans.reduce((acc,curr) => {
        acc+= curr   
        return acc    
    },0).toFixed(2)

    return (
       { totalAmount,totalPrice, totalTax}
    )
};

export default CountTotal;