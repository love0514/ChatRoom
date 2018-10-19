import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import ejs from 'ejs';
const SocketHander = require('./socket/index');
var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', async (socket) => {
  console.log('a user connected');
  const socketHander = new SocketHander();

  socketHander.connect();
  // io.emit("message", 'Hello wWrld!');
  const history = await socketHander.getMessages();

  io.emit('history', history);
  
  socket.on("message", (obj) => {
    socketHander.storeMessages(obj);
    io.emit("message", obj);
  });


  socket.on("disconnect", () => {
    console.log("a user go out");
  });

});

server.listen(3001);

// view engine setup
app.set('views', path.join(__dirname, '../client/dist'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get("/", (req, res, next) => {
  // index即我们上面设置的app.set('views', path.join(__dirname, '../client/dist'));
  // 和app.use(express.static(path.join(__dirname, '../client/dist')));
  // 这两个设置告诉express我们的视图怎样去渲染
  res.render('index');
  // node只监听跟路径"/"路由然后发送index.html到浏览器，其他任何路由的变化即每一次客户端发起请求(如/login、/register、／user改变而现实不同的页面和数据等这些由react-router控制实现组件页面跳转的路由并渲染不同的接口数据)。
});

// // 引入API接口
// app.use('/api', api)
// // 解构赋值
// const { db: { mongodb }, options } = config;
// // mongodb测试
// mongoose.connect(mongodb, options);

// // 实例化连接
// const db = mongoose.connection;

// db.on('error', (err) => {
//   console.error('MongoDB连接失败！！' + err)
// });

// db.once('open', () => {
//   console.log('MongoDB连接成功！！')
// })
// app.listen(port, () => {
//   console.info('server is runing on port ' + port)
// })
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
