/**
 *  路由
 */

let fs = require('fs');
let http = require('http/app');

// 搭建服务器
let server = http.createServer(function (req, res) {
    if (req.url !== 'favicon.ico') {
        // 判断用户所访问的页面地址
        if (req.url === '/home' || req.url === '/') {
            res.writeHead(200, {'Content-type':'text/html'});
            fs.createReadStream('./index.html').pipe(res);
        }
        else if (req.url === '/contact') {
            res.writeHead(200, {'Content-type':'text/html'});
            fs.createReadStream('./contact.html').pipe(res);
        }
        else if (req.url === '/api/docs') {
            res.writeHead(200, {'Content-type':'text/html'});
            fs.createReadStream('./api/docs.html').pipe(res);
        }
    }
});

server.listen(12301,'127.0.0.1');
console.log('server is running, Please open the browser to enter http://localhost:12301');