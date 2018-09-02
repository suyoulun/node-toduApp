/**
 * 缓存区
 * BUFFER
 *
 * 数据流
 * streams
 *
 * 管道事件(输出方向)
 * pipes
 */


// 读写数据流示例
let fs = require('fs');

// 读取文件流
let myReadStream = fs.createReadStream('./README.txt','utf8');

// console.log(myReadStream); // 文件对象

// 写入文件流
let myWriteStream = fs.createWriteStream('./writeMe.txt');

let time = 0;
myReadStream.on('data',function (chunk) {
    time++;
    console.log(`=============正在接收第${time}部分数据=============`);
    // console.log(chunk); // 数据块

    // 分多次写入数据
    myWriteStream.write(chunk);
});


/*========== 使用pipe ==========*/
let myWriteStream2 = fs.createWriteStream('./writeMe2.txt');

myReadStream.pipe(myWriteStream2);