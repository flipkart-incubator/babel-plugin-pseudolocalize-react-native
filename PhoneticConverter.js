module.exports = function convertToPhonetics(orgStr, extraLength, languageMapString) {
    if (!extraLength) {
        extraLength = 0.8;
    }
    if (!languageMapString) {
        languageMapString = '';
    }
    if (typeof orgStr !== 'string') {
        return orgStr;
    }
    if (!orgStr) {
        return '';
    }
    let PseudoLangMap = {};
    try{
        PseudoLangMap = JSON.parse(languageMapString);
    }
    catch (e){
        console.error(e, "Failed to parse languageMapString");
    }

    function addExtraCharacters(str, extraLength) {
        let strLen = Math.floor(extraLength * str.length);
        let appendToStr = '';
        while (strLen > 0) {
            appendToStr = appendToStr + '!';
            strLen--;
        }
        return appendToStr;
    }

    const origStrArr = orgStr.split('');
    const phoneticArr = [];
    origStrArr.forEach((char) => {
        if (char in PseudoLangMap) {
            const phoneticChar = PseudoLangMap[char];
            phoneticArr.push(phoneticChar);
        } else {
            phoneticArr.push(char);
        }
    });
    return phoneticArr.join('') + addExtraCharacters(orgStr, extraLength);
}
