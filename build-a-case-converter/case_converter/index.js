function getUpperCase(str) {
    return str.toUpperCase();
}

function getLowerCase(str) {
    return str.toLowerCase();
}

function getSentenceCase(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

function getProperCase(str) {
    const words = str.split(' ');

    let sentence = [];

    for (let w of words) {
        let word = `${w.charAt(0).toUpperCase()}${w.slice(1).toLowerCase()}`;

        sentence.push(word);
    }

    return sentence.join(' ');
}

module.exports = {
    getUpperCase, 
    getLowerCase,
    getSentenceCase, 
    getProperCase
};