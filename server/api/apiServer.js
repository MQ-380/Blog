import Express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const port = 3030;

const app = new Express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/', require('./main'));
app.use('/admin', require('./admin'));
app.use('/article', require('./article'));



mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/blog',{useMongoClient:true}, function(err) {
  if(err) {
    console.error('数据库连接失败');
    return;
  }
  console.log('数据库连接成功');
})


export const io = require('socket.io').listen(app.listen(port, function(err){
  if(err) {
    console.error('err:',err);
  } else {
    console.info('api server is running');
  }
}))

