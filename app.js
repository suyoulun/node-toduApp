// 路径
console.log(__dirname);
console.log(__filename);

// 全局对象
console.log(global);

const stuff = require('./stuff');
console.log(stuff.counter(['AA', 'BB', 'CC']));
console.log(stuff.adder(7,8));
console.log(stuff.pi);





