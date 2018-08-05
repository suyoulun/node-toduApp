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
var fs = require('fs');

// 读取文件流
var myReadStream = fs.createReadStream(__dirname+'/README.txt','utf8');

// 写入文件流
var myWriteStream = fs.createWriteStream(__dirname+'writeMe.txt');

console.log(myReadStream);

myReadStream.on('data',function (chunk) {
    console.log(`=============正在接收一部分数据=============`);
    // console.log(chunk);

    // 写入数据
    myWriteStream.write(chunk);
});