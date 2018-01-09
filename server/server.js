const webpack  = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const config  = require('../webpack.config');
const Express = require('express');
const http = require('http');
const path = require('path');



const app = new Express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname+'/app');
app.set('view engine','html');

app.use(WebpackDevMiddleware(webpack(config),{
  publicPath: config.output.publicPath,
}));

app.use('/build',Express.static(path.join(__dirname,"..",'app/build/')));


app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'..','app/index.html'));
})



app.listen(3000, (err)=>{
  if(err) {
    return console.error(err);
  }
  return console.log('opening the localhost:3000');
})



