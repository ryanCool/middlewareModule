function rule1(data) {
    return data;
}

function rule2(data) {
    return data;
}

function rule3(data) {
    return data;
}

function rule4(data) {
    return data;
}

function rule5(data) {
    return data;
}

function rule6(data) {
    return data;
}

function rule7(data) {
    return data;
}

function rule8(data) {
    return data;
}

function rule9(data) {
    return data;
}

function rule10(data) {
    return data;
}

const dict = {
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