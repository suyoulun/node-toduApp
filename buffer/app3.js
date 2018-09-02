/** 给浏览器返回 html
 *  给浏览器返回 json
 */


let fs = require('fs');
let http = require('http/app');

// 搭建服务器
let server = http.createServer(function (req, res) {
    // 去掉 favicon 请求
    if (req.url !== '/favicon.ico') {
        // 如果返回 html
        res.writeHead(200, {'Content-type':'text/html'});  // 响应头要 修改成 html 格式
        let htmlStream = fs.createReadStream('./index.html','utf8');  // 读取html
        htmlStream.pipe(res);

        // 如果返回 json
        // res.writeHead(200, {'Content-type':'application/json'});  // 响应头要 修改成 json 格式
        // let jsonStream = fs.createReadStream('./person.json','utf8');  // 读取 json
        // jsonStream.pipe(res);
    }
});

server.listen(12301,'127.0.0.1');
console.log('server is running......');
console.log('Please open the browser to enter http://localhost:12301');