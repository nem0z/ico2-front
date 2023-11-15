const getCategories = function () {
    return fetch('../data/category.json');
}

const getFe = function (category) {
    return fetch('../data/fe.json')
        .then(Fe => Fe.filter(x => x.category == category));
}

const getFeUnits = function (fe) {
    return fetch('../data/fe-unit.json')
        .then(FeUnit => FeUnit.filter(x => x.fe == fe));
}

export { getCategories, getFe, getFeUnits };