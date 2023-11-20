const sum = arr => arr.reduce((p, a) => p+a, 0);

const sumOf = (arr, x) => arr.reduce((p, a) => p+a[x], 0);

export { sum, sumOf };