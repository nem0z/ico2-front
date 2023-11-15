import Category from "../data/category.js";
import Fe from "../data/fe.js";
import FeUnit from "../data/fe-unit.js";

const getCaterogies = function () {
    return new Promise((resolve, reject) => {
        resolve(Category);
        reject(new Error("An error occured"));
    });
}

export { getCaterogies };