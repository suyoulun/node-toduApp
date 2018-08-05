const counter = function (arr) {
    return '共有' + arr.length + '个元素在数组中'
};

const adder = function (a, b) {
    return `你需要计算的两个值的和为：${a + b}`
};

const pi = 3.142;

// module.exports.counter = counter;
// module.exports.adder = adder;
// module.exports.pi = pi;

module.exports = {
    counter,
    adder,
    pi
}
