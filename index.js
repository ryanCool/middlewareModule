const YAML = require('yamljs');
const fs = require("fs");

var ruleConfig = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true };

module.exports = function(yamlFile, jsonFile, ruleSwitchOption) {
    var yamlData = YAML.parse(fs.readFileSync(yamlFile).toString());
    var jsonData = JSON.parse(fs.readFileSync(jsonFile).toString());




    return yamlResult, jsonResult, null
};