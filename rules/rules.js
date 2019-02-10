function modifyPath(data) {
    const result = data;
    if (data.method === 'GET') {
        result.url = data.url.replace('/shopback/resource', '/shopback/static/assets');
    }
    return result;
}

function checkSbcookie(data) {
    if (data.method === 'GET' && data.url.includes('/shopback/me')) {
        const kvPairs = data.headers.cookie.split(';');
        let found = false;
        kvPairs.forEach((pair) => {
            const index = pair.indexOf('=');
            const key = pair.substr(0, index);
            // const value = pair.substr(0, index);
            if (key.toLowerCase() === 'sbcookie') {
                found = true;
            }
        });
        if (found === false) {
            throw new Error('request dont exist sbcookie');
        }
    }
    return data;
}

function checkRefererHeader(data) {
    if (data.method === 'GET') {
        if (data.headers.referer.toLowerCase().includes('www.shopback.com') === false) {
            throw new Error('request not referer from www.shopback.com​​');
        }
    }
    return data;
}

function addFrom(data) {
    const result = data;
    if (data.method === 'GET') {
        if (data.url.toLowerCase().includes('/shopback/api/') === true) {
            result.headers.from = '​hello@shopback.com';
        }
    }
    return result;
}

function removeQuery(data) {
    const result = data;
    if (data.method === 'POST' || data.method === 'PUT') {
        const index = data.url.indexOf('?');
        const newurl = data.url.substr(0, index);
        result.url = newurl;
    }

    return result;
}


function checkAgent(data) {
    if (data.method === 'POST' || data.method === 'PUT') {
        if (!('x-shopback-agent' in data.headers)) {
            throw new Error('agent not exist');
        }
    }

    return data;
}

function checkContentType(data) {
    if (data.method === 'POST' || data.method === 'PUT') {
        if (data.headers['content-type'].toLowerCase() !== 'application/json') {
            throw new Error('content-type header invalid');
        }
    }
    return data;
}

function deletePermission(data) {
    if (data.method === 'DELETE') {
        if (data.headers['x-shopback-agent'] !== 'AGENT_1') {
            throw new Error('agent do not have permission');
        }
    }
    return data;
}

function addTimestamp(data) {
    const result = data;
    result.headers['X-SHOPBACK-TIMESTAMP'] = Date.now();

    return data;
}

function checkDomain(data) {
    if (!(data.url.includes('www.shopback.com'))) {
        throw new Error('wrong domain for request');
    }

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