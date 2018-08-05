/*============= 文件系统 =============*/
// 1.读取文件(fs.readFile/fs.readeFileSync)  同步/异步
// 2.写入文件(fs.writeFile)

// 1.引入文件系统模块
let fs = require('fs');

// 2.通过对象调用方法
const readme = fs.readFileSync('README.txt', 'utf8');  // 同步读取
console.log('readme：' + readme);

// 同步写入
fs.writeFileSync('writeMe.txt', '通过fs写入txt');

// 异步读取文件
fs.readFile('README.txt', 'utf8', (err,data) => {
    if (err) throw err;  // 异常捕获
    console.log('data: '+data);

    // 异步写入文件
    fs.writeFile('writeMe2.txt', data);
});


// 创建文件夹（fs.mkdir）
// 删除文件夹（fs.rmdir）
// 删除文件（fs.unlink）

// 异步删除文件
fs.unlink('writeMe.txt', (err) => {
    if (err) throw err;  // 异常捕获
    console.log('文件删除成功');
});

// 创建文件夹 同步
fs.mkdirSync('stuff');

// 删除文件夹 同步
fs.rmdirSync('stuff');

// !不能删除有内容的文件夹