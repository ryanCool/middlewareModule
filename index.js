const YAML = require('yamljs');
const fs = require("fs");
var ruleDict = {
    1: rule1,
    2: rule2,
    3: rule3,
    4: rule4,
    5: rule5,
    6: rule6,
    7: rule7,
    8: rule8,
    9: rule9,
    10: rule10,
}


//Default is all true for list rules
var ruleConfig = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true };

module.exports = function(yamlFile, jsonFile, ruleSwitchOption) {
    var yamlData = YAML.parse(fs.readFileSync(yamlFile).toString());
    var jsonData = JSON.parse(fs.readFileSync(jsonFile).toString());




    return yamlResult, jsonResult, null
};



function rule1(data) {
    return data
}

function rule2(data) {
    return data
}

function rule3(data) {
    return data
}

function rule4(data) {
    return data
}

function rule5(data) {
    return data
}

function rule6(data) {
    return data
}

function rule7(data) {
    return data
}

function rule1(data) {
    return data
}

function rule1(data) {
    return data
}

function rule1(data) {
    return data
}