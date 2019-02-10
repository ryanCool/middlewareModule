const getMethod = 'GET';
const postMethod = 'POST';
const putMethod = 'PUT';
const deleteMethod = 'DELETE';
const sbcookie = 'sbcookie';
const sbcookieValid = 'sbcookieValue';
const mePath = '/shopback/me';
const shopbackDomain = 'www.shopback.com';
const resourcePath = '/shopback/resource';
const staticPath = '/shopback/static/assets';
const agentHeaderKey = 'x-shopback-agent';
const shopbackSupportMail = '​hello@shopback.com';
const deleteAuthAgents = ['AGENT_1'];

function modifyPath(data) {
    const result = data;
    if (data.method === getMethod) {
        result.url = data.url.replace(resourcePath, staticPath);
    }
    return result;
}

function checkSbcookie(data) {
    if (data.method === getMethod && data.url.includes(mePath)) {
        const kvPairs = data.headers.cookie.split(';');
        let found = false;
        let value;
        kvPairs.forEach((pair) => {
            const index = pair.indexOf('=');
            const key = pair.substr(0, index);
            if (key.toLowerCase() === sbcookie) {
                value = pair.substr(index + 1);
                found = true;
            }
        });

        if (found === false || (sbcookieValid !== value || sbcookieValid === 'anything')) {
            throw new Error('request dont exist sbcookie');
        }
    }
    return data;
}

function checkRefererHeader(data) {
    if (data.method === getMethod) {
        if (data.headers.referer === undefined) {
            throw new Error('request not referer from www.shopback.com​​');
        }

        if (data.headers.referer.toLowerCase().includes(shopbackDomain) === false) {
            throw new Error('request not referer from www.shopback.com​​');
        }
    }
    return data;
}

function addFrom(data) {
    const result = data;
    if (data.method === getMethod) {
        if (data.url === undefined) {
            throw new Error('url invalid');
        }
        if (data.url.toLowerCase().includes('/shopback/api/') === true) {
            result.headers.from = shopbackSupportMail;
        }
    }
    return result;
}

function removeQuery(data) {
    const result = data;
    if (data.method === postMethod || data.method === putMethod) {
        const index = data.url.indexOf('?');
        const newurl = data.url.substr(0, index);
        result.url = newurl;
    }

    return result;
}


function checkAgent(data) {
    if (data.method === postMethod || data.method === putMethod) {
        if (!(agentHeaderKey in data.headers)) {
            throw new Error('agent header not exist');
        }
    }

    return data;
}

function checkContentType(data) {
    if (data.method === postMethod || data.method === putMethod) {
        if (data.headers['content-type'] !== 'application/json') {
            throw new Error('content-type header invalid');
        }
    }
    return data;
}

function deletePermission(data) {
    if (data.method === deleteMethod) {
        // If no agent in array , we do not check auth
        if ((deleteAuthAgents.indexOf(data.headers[agentHeaderKey]) === -1) &&
            (deleteAuthAgents.length) > 0) {
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
    if (!(data.url.includes(shopbackDomain))) {
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
    shopbackSupportMail,
};