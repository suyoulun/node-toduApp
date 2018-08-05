### Node介绍

前端最新主流 JavaScript 运行环境

- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
- Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。
- Node.js 的包管理器 npm ，是全球最大的开源库生态系统。



### Node全局对象

```js
console.log(global);
```



### 路径

```js
console.log(__dirname);  // 不包含文件名的路径
console.log(__filename);  // 包含文件名的路径
```



### V8引擎

- 电脑根本不识别也不理解JavaScript

- JavaScript 引擎起到的作用就是让电脑识别 JS 代码

  ​

- Node.js 是使用 C++ 写的

- V8 引擎是 Node.js 的核心

- V8 引擎的作用就是让 JS 代码能够让电脑识别

- V8 引擎也是用 C++ 写的



### Module&Require

stuff.js

```js
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

// 公开方法
module.exports = {
    counter,
    adder,
    pi
}
```

app.js

```js
var stuff = require('./stuff.js');  // 引用模块
console.log(stuff.counter(['Henry','Bucky','Emily']));
console.log(stuff.adder(3,4));
console.log(stuff.pi);
```



### 事件模块 Events

- 大多数 Node.js 核心 API 都是采用惯用的异步事件驱动架构（fs / http）
- 所有能触发事件的对象都是 EventEmitter 类的实例
- 事件流程：引入模块 → 创建 EventEmitter 对象 → 注册事件 → 触发事件

```js
// 1.引入事件模块
let events = require('events');

// 2.创建EventEmitter对象
let myEmitter = new events.EventEmitter();

// 3.注册事件
myEmitter.on('someEvent', function (msg) {
    console.log(msg);
    setImmediate(()=>{
        console.log('异步：' + msg);
    })
});

// 4.触发事件
myEmitter.emit('someEvent', '触发事件并传递此参数到注册事件的回调函数中');

console.log('1');
```



### 文件系统  FileSystem

- 读取文件 （fs.readFile）
- 写入文件 （fs.writeFile）
- 流程：引入 fs 模块 → 调用方法 → 异常捕获



























