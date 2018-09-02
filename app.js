// 引入express模块
var express = require('express');

// 实例化express对象
var app = express();

// 配置视图引擎
app.set('view engine', 'ejs');

// 让服务器识别外部样式表
app.use('/assets', express.static('assets'));

// 根据用户请求的地址，返回对应的数据信息
app.get('/', (req, res)=>{
    // console.log(req.url);
    // res.sendFile(__dirname + '/index.html');
    res.render('index');
});

app.get('/contact',(req, res)=>{
    // res.send('This is a contact page!');
    // res.sendFile(__dirname + '/contact.html');
    res.render('contact');
});

// 路由参数
app.get('/profile/:id',(req, res)=>{
    // res.send('您所访问的路径参数为：' + req.params.id);
    var data = [{name:['Allen','Emily'],age:28},{name:['Henry','Elyse','John'],age:30}];
    res.render('profile', {websiteName:req.params.id,data:data});
});


// 监听服务器端口号
app.listen(8888);