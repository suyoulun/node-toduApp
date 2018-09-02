/**
 * module： 模块
 * require： 引入node模块
 */

// 路径
console.log(__dirname);

// 当前的路径+文件名
console.log(__filename);

// 全局对象
console.log(global);

const stuff = require('./module/stuff');
console.log(stuff.counter(['AA', 'BB', 'CC']));
console.log(stuff.adder(7,8));
console.log(stuff.pi);
