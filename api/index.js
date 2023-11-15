import { getCaterogies, getFe, getFeUnits } from "./fakeRouter.js";

getCaterogies().then(console.log);

getFe(5).then(console.log);
getFe(1).then(console.log);

getFeUnits(1).then(console.log);
getFeUnits(3).then(console.log);