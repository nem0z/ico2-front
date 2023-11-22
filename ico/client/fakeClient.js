const getCategories = function () {
    return fetch('/data/category.json')
        .then(res => res.json());
}

const getFe = function (category) {
    return fetch('/data/fe.json')
        .then(res => res.json())
        .then(fe => fe.filter(x => x.category == category));
}

const getFeUnits = function (fe) {
    return fetch('/data/fe-unit.json')
        .then(res => res.json())
        .then(feUnit => feUnit.filter(x => x.fe == fe));
}

export { getCategories, getFe, getFeUnits };