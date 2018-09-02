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

- 读取文件(`fs.readFile`/`fs.readeFileSync`)  异步/同步
- 写入文件(`fs.writeFile`/`fs.writeFileSync`)  异步/同步
- 流程：引入 fs 模块 → 调用方法 → 异常捕获




**同步读取 - 同步写入**

```` js
// 1.引入文件系统模块
let fs = require('fs');

// 2.通过对象调用方法
const readme = fs.readFileSync('README.txt', 'utf8');  // 同步读取
console.log('readme：' + readme);

// 同步写入
fs.writeFileSync('writeMe.txt', '通过fs写入txt');
````



**异步读取 - 异步写入**

```js
// 同步写入
fs.writeFileSync('writeMe.txt', '通过fs写入txt');

// 异步读取文件
fs.readFile('README.txt', 'utf8', (err, data) => {
    if (err) throw err;  // 异常捕获
    console.log('data: ' + data);

    // 异步写入文件
    fs.writeFile('writeMe2.txt', data);
});
```



**创建 / 删除**

```js
// 创建文件夹（fs.mkdir/fs.mkdirSync） 异步/同步
// 删除文件夹（fs.rmdir/fs.rmdirSync） 异步/同步
// 删除文件（fs.unlink/fs.unlinkSync） 异步/同步

// 异步删除文件
fs.unlink('writeMe.txt', (err) => {
    if (err) throw err;  // 异常捕获
    console.log('文件删除成功');
});

// 创建文件夹 同步
fs.mkdirSync('stuff');

// 删除文件夹 同步
fs.rmdirSync('stuff');

# !不能删除有内容的文件夹
```

 

### 创建服务器

概念理解:

客户端：client，请求信息：request
服务器：server，响应信息：response

客户端通过 http(s) socket 向服务器发送请求
服务器通过 TCP协议 返回客户端

```js
// 引入 http 模块
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
```





### 缓存区&数据流

**缓存区** BUFFER

可以在TCP流和文件系统操作等场景中处理二进制数据流。
DATA  -->  BUFFER 缓存区  -->  DATA PASSED ON

**数据流**  streams 

在 Node.js 中是处理流数据的抽象接口
streams 数据流

**管理事件**  Pipes

控制数据流的去向



读写数据流示例

```js
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
```



输出 纯文本 / html / json 到浏览器

``` js
let fs = require('fs');
let http = require('http');

// 搭建服务器
let server = http.createServer(function (req, res) {
    // 返回纯文本
    res.writeHead(200, {'Content-type':'text/plain'});  // 响应头
    let myReadStream = fs.createReadStream('./README.txt','utf8');  // 读取文件流
    myReadStream.pipe(res);  // 读取到的数据流返回到浏览器

    // 如果返回 html
    res.writeHead(200, {'Content-type':'text/html'});  // 响应头要 修改成 html 格式
    let htmlStream = fs.createReadStream('./index.html','utf8');  // 读取html
    htmlStream.pipe(res);

    // 如果返回 json
    res.writeHead(200, {'Content-type':'application/json'});  // 响应头要 修改成 json 格式
    let jsonStream = fs.createReadStream('./person.json','utf8');  // 读取 json
    jsonStream.pipe(res);
});

server.listen(12301,'127.0.0.1');
console.log('server is running......');
```



屏蔽 favicon.ico 请求

```js
let server = http.createServer(function (req, res) {
    // 去掉 favicon 请求
    if (req.url !== '/favicon.ico') {
			---
       res.end();
    }
});
```





### 路由模块

根据用户访问不同地址（req.url）返回不同页面

``` js
let fs = require('fs');
let http = require('http');

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
```





### NPM包管理工具

[npm官网](https://www.npmjs.com)

Node Package Manager

NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题。
1.允许用户从NPM服务器下载别人编写的第三方包到本地使用。
2.允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
3.允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

**package.json：**用于定义项目中所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）

```bash
// 初始化npm
npm init
// 安装 jquery
npm install jquery
// 卸载 jquery
npm install jquery
```



**指令**

```
--save          保存安装信息到 dependencies(依赖模块)，等同 --S
--save-dev      保存安装信息到 devDependencies(开发中的依赖)，等同 --D
```



### Express框架

基于Node.js平台，快速、开放、极简的web开发框架。

已经封装好服务器、路由、中间件、网络请求......

```
npm install express --save
```



开始使用 express 框架

```js
// 引入express模块
var express = require('express');

// 实例化express对象
var app = express();

// 根据用户请求的地址，返回对应的数据信息
app.get('/', (req, res)=>{
    // console.log(req.url);
    res.send('This is a home page!');
});

app.get('/contact',(req, res)=>{
    res.send('This is a contact page!');
});

// 路由参数
app.get('/profile/:id',(req, res)=>{
    res.send('您所访问的路径参数为：' + req.params.id);
});

// 监听服务器端口号
app.listen(8888);
```





### EJS模板引擎

1.快速编译和渲染
2.简单的模板标签
3.支持浏览器端和服务器端
4.支持express视图系统

[在线测试EJS](http://www.embeddedjs.com/)

```
nmp install --save-dev ejs
```



**在express使用ejs**

 app.js

```js
// 引入express模块
var express = require('express');

// 实例化express对象
var app = express();

#// 配置视图引擎
app.set('view engine', 'ejs');

// 根据用户请求的地址，返回对应的数据信息
app.get('/', (req, res)=>{
    // console.log(req.url);
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact',(req, res)=>{
    // res.send('This is a contact page!');
    res.sendFile(__dirname + '/contact.html');
});

// 路由参数
app.get('/profile/:id',(req, res)=>{
    // res.send('您所访问的路径参数为：' + req.params.id);
    #// 使用render方法在views文件夹下寻找ejs模板并解析，且可传递参数
    res.render('profile', req.params);
});

// 监听服务器端口号
app.listen(8888);
```

/views/profile.ejs

```ejs
<body>
<h1>EJS page!</h1>
<h2>参数：<%= id %></h2>
</body>
```



**遍历对象**

 app.js

``` js
......
app.get('/profile/:id',(req, res)=>{
    // res.send('您所访问的路径参数为：' + req.params.id);
    var data = [{name:['Allen','Emily'],age:28},{name:['Henry','Elyse','John'],age:30}];
    res.render('profile', {websiteName:req.params.id,data:data});
});
......
```

/views/profile.ejs

```ejs
<ul>
    <% for (var i = 0; i < data.length; i++) { %>
    <li>
        <p><strong>age:</strong><%= data[i].age %></p>
        <% data[i].name.forEach(function (item) { %>
            <p><strong>name:</strong><%= item %></p>
        <% }) %>
    </li>
    <% } %>
</ul>
```



**公共模板**

1.使用EJS替代HTML

```js
#app.js
// 所有ejs存放在views文件夹下，且 request 使用 render 方法
app.get('/', (req, res)=>{
    res.render('index');  // 找到 /views/index.ejs
});
```



2.创建导航（公共模板）

> 1.创建 public 文件夹以存放公共模板ejs（`/public/nav.ejs`）
>
> 2.在需要引用公共模块的地方引入，如`index.ejs`
>
> ```ejs
> <!-- 引入公共导航模板 -->
> <% include ../public/nav.ejs %>
> ```



3.解决外部样式不可用的问题

常规link引入css，且要设置服务器识别

```js
#index.ejs
<link rel="stylesheet" href="../assets/style.css">

#app.js
// 让服务器识别外部样式表
app.use('/assets', express.static('assets'));
```





### nodemon工具

在开发环境下，往往需要一个工具来自动重启项目工程，我们可以借助nodemon来代替node进行启动。

```bash
// 安装
npm install -g nodemon
npm install --D nodemon 
// 启动
nodemon app.js
```

















