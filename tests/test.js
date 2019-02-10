const assert = require('assert');
const middleware = require('../');
const rules = require('../rules/rules');
// Default is all false for test
const allFalseConfig = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
};


describe('rule1 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[1] = true;
    it('should success modify path', () => {

        const output = middleware('./data/rule1.yaml', './data/rule1.json', config);

        assert.equal(output[0].url, 'http://www.shopback.com/shopback/static/assets?q=1');
        assert.equal(output[1].url, 'http://www.shopback.com/shopback/static/assets?q=1');
    });

    it('should not modeify because path not meet', () => {

        const output = middleware('./data/rule1_fail.yaml', './data/rule1_fail.json', config);

        assert.equal(output[0].url, 'http://www.shopback.com/shopback/resource?q=1');
        assert.equal(output[1].url, 'http://www.shopback.com/shopback/resource?q=1');
    });

});


describe('rule2 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[2] = true;
    it('success', () => {
        middleware('./data/rule2.yaml', './data/rule2.json', config);
    });

    it('got error', () => {
        try {
            middleware('./data/rule2_fail.yaml', './data/rule2_fail.json', config);
        } catch (e) {
            console.log(e);
        }
    });
});


describe('rule3 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[3] = true;
    it('success', () => {
        middleware('./data/rule3.yaml', './data/rule3.json', config);
    });
});

describe('rule4 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[4] = true;
    it('success', () => {
        const output = middleware('./data/rule4.yaml', './data/rule4.json', config);

        assert.equal(output[0].headers.from, rules.shopbackSupportMail);
        assert.equal(output[1].headers.from, rules.shopbackSupportMail);
    });
});

describe('rule5 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[5] = true;
    it('success', () => {
        const output = middleware('./data/rule5.yaml', './data/rule5.json', config);

        assert.equal(output[0].url, 'http://www.shopback.com/shopback/api/users');
        assert.equal(output[1].url, 'http://www.shopback.com/shopback/api/users');
    });
});


describe('rule6 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[6] = true;
    it('success', () => {
        middleware('./data/rule6.yaml', './data/rule6.json', config);
    });
});


describe('rule7 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[7] = true;
    it('success', () => {
        middleware('./data/rule7.yaml', './data/rule7.json', config);
    });
});

describe('rule8 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[8] = true;
    it('success', () => {
        middleware('./data/rule8.yaml', './data/rule8.json', config);
    });
});


describe('rule9 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[9] = true;
    it('success', () => {
        const output = middleware('./data/rule9.yaml', './data/rule9.json', config);
        assert.notEqual(output[0].headers['X-SHOPBACK-TIMESTAMP'], undefined);
    });
});


describe('rule10 test', () => {
    const config = Object.assign({}, allFalseConfig);
    config[10] = true;
    it('success', () => {
        middleware('./data/rule10.yaml', './data/rule10.json', config);
    });
});