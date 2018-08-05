/**
 * client --request-->> server
 * client <<--response-- server
 *
 * 客户端通过 http(s) socket 向服务器发送请求
 * 服务器通过 TCP协议 返回客户端
 */


var http = require('http');

// 创建服务器
var server = http.createServer(function (req, res) {
    // 客户端信息
    console.log('客户端向服务器发送请求：'+req.url);
    // 响应头
    res.writeHead(200,{'Content-type':'text/plain'});
    // 响应数据
    res.end('Server is working');
});

// 服务对象监听服务器地址及端口号
server.listen(12301,'127.0.0.1');

