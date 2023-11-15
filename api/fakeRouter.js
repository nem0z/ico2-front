import Category from "../data/category.js";
import Fe from "../data/fe.js";
import FeUnit from "../data/fe-unit.js";

const getCaterogies = function () {
    return new Promise((resolve, reject) => {
        resolve(Category);
        reject(new Error("An error occured"));
    });
}

const getFe = function (category) {
    return new Promise((resolve, reject) => {
        resolve(Fe.filter(x => x.category == category));
        reject(new Error("An error occured"));
    });
}

const getFeUnits = function (fe) {
    return new Promise((resolve, reject) => {
        resolve(FeUnit.filter(x => x.fe == fe));
        reject(new Error("An error occured"));
    });
}

export { getCaterogies, getFe, getFeUnits };