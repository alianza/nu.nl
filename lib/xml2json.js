import { xml2json } from "xml-js";

const removeJsonTextAttribute = function (value, parentElement) {
    try {
        const parentOfParent = parentElement._parent;
        const pOpKeys = Object.keys(parentOfParent);
        const keyNo = pOpKeys.length;
        const keyName = pOpKeys[keyNo - 1];
        const arrOfKey = parentOfParent[keyName];
        const arrOfKeyLen = arrOfKey.length;
        if (arrOfKeyLen > 0) {
            const arr = arrOfKey;
            const arrIndex = arrOfKey.length - 1;
            arr[arrIndex] = value;
        } else {
            parentOfParent[keyName] = value;
        }
    } catch (e) {
        console.log(e);
    }
};

const xmlToJson = (xml) => {
    return xml2json(xml, {
        compact: true,
        spaces: 4,
        ignoreDeclaration: true,
        textFn: removeJsonTextAttribute,
    });
};

export default xmlToJson;
