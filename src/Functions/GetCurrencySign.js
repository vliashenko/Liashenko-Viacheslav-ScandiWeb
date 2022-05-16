export function GetCurrencySign(state) {
    if(state === "USD"){
        return "$"
    } else if (state === "GBP"){
        return "£"
    } else if (state === "AUD"){
        return "A$"
    } else if (state === "JPY"){
        return "¥"
    } else {
        return "₽"
    }
}