//  usage
// shopbackMiddleware('input.yaml', 'input.json', { 1: false, 3: false });

const YAML = require('yamljs');
// const yamlLint = require('yaml-lint');
const fs = require('fs');
const rules = require('./rules/rules');

const errYAMLlInvalid = new Error('yaml format invalid');
const errJSONInvalid = new Error('json format invalid');

function shopbackMiddleware(yamlFile, jsonFile, ruleSwitchOption) {
    let jsonData;
    let yamlData;
    try {
        jsonData = JSON.parse(fs.readFileSync(jsonFile).toString());
    } catch (e) {
        throw errJSONInvalid;
    }

    try {
        yamlData = YAML.parse(fs.readFileSync(yamlFile).toString());
    } catch (e) {
        throw errYAMLlInvalid;
    }


    let data = yamlData;
    // Default config
    const ruleCheck = rules.config;
    if (ruleSwitchOption) {
        Object.keys(ruleSwitchOption).forEach((key) => {
            ruleCheck[key] = ruleSwitchOption[key];
        });
    }

    Object.keys(ruleCheck).forEach((key) => {
        if (ruleCheck[key]) {
            data = rules.dict[key](data);
        }
    });

    return [yamlData, jsonData, null];
}

module.exports = shopbackMiddleware;