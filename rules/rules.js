function modifyPath(data) {
    const result = data;
    if (data.method.toLowerCase() === 'get') {
        result.url = data.url.replace('/shopback/resource', '/shopback/static/assets');
    }
    return result;
}

function checkSbcookie(data) {
    if (data.method.toLowerCase() === 'get' && data.url.includes('/shopback/me')) {
        const kvPairs = data.headers.Cookie.split(';');
        let found = false;
        kvPairs.forEach((pair) => {
            const index = pair.indexOf('=');
            const key = pair.substr(0, index);
            // const value = pair.substr(0, index);
            if (key.toLowerCase() === 'sbcookie') {
                found = true;
            }
        });
        if (!found) {
            throw new Error('request dont exist sbcookie');
        }
    }
    return data;
}

function checkRefererHeader(data) {
    return data;
}

function addFrom(data) {
    return data;
}

function removeQuery(data) {
    return data;
}

function checkAgent(data) {
    return data;
}

function checkContentType(data) {
    return data;
}

function deletePermission(data) {
    return data;
}

function addTimestamp(data) {
    return data;
}

function checkDomain(data) {
    return data;
}

const dict = {
    1: modifyPath,
    2: checkSbcookie,
    3: checkRefererHeader,
    4: addFrom,
    5: removeQuery,
    6: checkAgent,
    7: checkContentType,
    8: deletePermission,
    9: addTimestamp,
    10: checkDomain,
};

// Default is all true for list rules
const config = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
};

module.exports = {
    config,
    dict,
};