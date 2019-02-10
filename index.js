const YAML = require('yamljs');
// const yamlLint = require('yaml-lint');
const fs = require('fs');
const rules = require('./rules/rules');

function shopbackMiddleware(yamlFile, jsonFile, ruleSwitchOption) {
    let jsonData;
    let yamlData;
    try {
        jsonData = JSON.parse(fs.readFileSync(jsonFile).toString());
    } catch (e) {
        throw new Error('json format invalid');
    }

    try {
        yamlData = YAML.parse(fs.readFileSync(yamlFile).toString());
    } catch (e) {
        throw new Error('yaml format invalid');
    }


    let data = yamlData;
    // Default config
    const ruleCheck = rules.config;
    // User custom config
    if (ruleSwitchOption) {
        Object.keys(ruleSwitchOption).forEach((key) => {
            ruleCheck[key] = ruleSwitchOption[key];
        });
    }

    // transform request by rules
    Object.keys(ruleCheck).forEach((key) => {
        if (ruleCheck[key]) {
            data = rules.dict[key](data);
        }
    });

    // console.log(data);

    return [yamlData, jsonData, null];
}

// shopbackMiddleware('./data/rule2.yaml', './data/rule2.json', { 1: true, 3: false });

module.exports = shopbackMiddleware;