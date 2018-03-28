const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const Mongoose = require('mongoose')
const config = require('../webpack.config')
const Express = require('express')
const path = require('path')
const Proxy = require('http-proxy')
const history = require('connect-history-api-fallback')

const app = new Express();

const targetUrl = 'http://127.0.0.1:3030'
const proxy = Proxy.createProxyServer({
  target: targetUrl
});

app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl})
});

app.use('/', history())
app.use('/', Express.static(path.join(__dirname, '..', 'build')))
app.use('/', Express.static(path.join(__dirname, '..', 'static')))

app.use(
  WebpackDevMiddleware(webpack(config), {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  })
)

app.use(WebpackHotMiddleware(webpack(config)));

// app.use('/build',Express.static(path.join(__dirname,"..",'app/build/')));
//
//
// app.get('/admin', (req,res)=>{
//   res.sendFile(path.join(__dirname,'..','app/build/index.html'));
// })

app.listen(3000, err => {
  if (err) {
    return console.error(err);
  }
  return console.log('opening the localhost:3000')
});
