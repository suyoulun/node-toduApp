/** 输出纯文本到浏览器
 */


let fs = require('fs');
let http = require('http/app');

// 搭建服务器
let server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type':'text/plain'});

    // 读取文件流
    let myReadStream = fs.createReadStream('./README.txt','utf8');

    myReadStream.pipe(res);
});

server.listen(12301,'127.0.0.1');
console.log('server is running......');