const YAML = require('yamljs');
const fs = require('fs');
const rules = require('./rules/rules');

function genData(data, ruleSwitchOption) {
    let result = data;
    Object.keys(result.headers).forEach((key) => {
        const tmp = data.headers[key];
        delete result.headers[key];
        // Header is case-insensitive , so we transfer to lower case .
        result.headers[key.toLowerCase()] = tmp;
    });
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
            result = rules.dict[key](result);
        }
    });

    return result;
}

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

    const jsonRes = genData(jsonData, ruleSwitchOption);
    const yamlRes = genData(yamlData, ruleSwitchOption);

    const resultJson = JSON.stringify(jsonRes, null, 4);
    const resultYaml = YAML.stringify(yamlRes);

    fs.mkdir('./result', { recursive: true }, (err) => {
        if (err) throw err;
        fs.writeFileSync('./result/result.json', resultJson);

        fs.writeFileSync('./result/result.yaml', resultYaml);
    });


    return [jsonData, yamlData];
}

module.exports = shopbackMiddleware;