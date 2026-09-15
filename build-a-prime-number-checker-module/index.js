function isPrime (num) {

    if (num === 1) {
        return false;
    }

    const basePrimes = [2, 3, 5, 7, 11];
    
    if (basePrimes.includes(num)) {
        return true;
    }

    let isPrime =  true;
    
    for (let prime of basePrimes) {
        if ( num % prime === 0 ) {
            isPrime = false;
            break;
        }
    }
    
    return isPrime;
}

module.exports = { isPrime };