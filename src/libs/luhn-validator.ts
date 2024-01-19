export const luhnValidator = (cardNumber: Number) => {
    var nCheck = 0;
    var nDigit = 0;
    var bEven = false;

    let sCardNumber = cardNumber.toString();

    for (var n = sCardNumber.length - 1; n >= 0; n--) {
        var cDigit = sCardNumber.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}