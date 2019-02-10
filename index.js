const YAML = require('yamljs');
// const yamlLint = require('yaml-lint');
const fs = require('fs');
const rules = require('./rules/rules');


function shopbackMiddleware(yamlFile, jsonFile, ruleSwitchOption) {
    var jsonData, yamlData
    try {
        jsonData = JSON.parse(fs.readFileSync(jsonFile).toString());
    } catch (e) {
        console.log("json format invalid");
        return
    }

    try {
        yamlData = YAML.parse(fs.readFileSync(yamlFile).toString());
    } catch (e) {
        console.log("yaml format invalid");
        return
    }


    let data = yamlData;
    //Default config
    let ruleCheck = rules.config;
    if (ruleSwitchOption) {
        ruleCheck = ruleSwitchOption;
    }

    Object.keys(ruleCheck).forEach((key) => {
        if (ruleCheck[key]) {
            data = rules.dict[key](data);
        }
    });

    return [yamlData, jsonData, null];
}

module.exports = shopbackMiddleware;

shopbackMiddleware('input.yaml', 'input.json');