/** 事件模块
 */

// 1.引入事件模块
let events = require('event/app');

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
myEmitter.emit('someEvent', '触发事件');

console.log('1');