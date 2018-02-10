import Express from 'express'
import Users from '../../db/Users'

const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid')

const router = Express.Router();

router.post('/login',(req, res) => {
  let {username, password} = req.body;
  Users.find({username: username},(err, data) => {
    if(err){
      res.json({status: false, msg: '请检查数据库'})
    }
    if(bcrypt.compareSync(password, data[0])) {
      const loginToken = uuidv4();
      Users.update({username: username}, {loginToken, loginTime: new Date()}, (err)=>{
        if(err){
          console.log(err);
          res.json({status: false, msg: '请检查数据库'})
        }
        res.json({status: true, isAdmin: data[0].isAdmin, token: loginToken});
      })
    } else {
      res.json({status: false, msg: '密码错误'})
    }
  })
})


router.post('/loginCheck', (req, res) => {
  let {token} = req.body;
  Users.find({loginToken:token},(err,data)=>{
    if(err) {
      res.json({status: false, msg: '请检查网络'})
    } else {
      if (!data[0]) {
        res.json({status: false, msg: '您的账号已经在别处登录，本地已下线'})
      } else {
        if (isExpired(data[0].loginTime)) {
          Users.update({username: data[0].username}, {loginToken: '', loginTime: null}, (err) => {
            if(err) {
              console.log(err);
              res.json({status: false, msg: '请检查网络'});
            }
            res.json({status: false, msg: '当前登录已经过期，请重新登录'})
          });
        } else {
          res.json({status: true, username: data[0].username, isAdmin: data[0].isAdmin})
        }
      }
    }
  })
})


router.post('/logout', (req, res) => {
  let {username} = req.body;
  Users.find({username}, (err, data) => {
    if(err) {
      res.json({status: false,  message: '退出登录失败，请检查网络'});
    } else {
      if(!data[0]) {
        res.json({status: false, message: '退出登录失败，请检查网络'});
      } else {
        Users.update({username}, {loginToken:'', loginTime: null}, (err)=>{
          if(err) {
            console.log(err);
            res.json({status: false, message: '退出登录失败，请检查网络'});
          }
          res.json({status: true});
          });
      }
    }
  })
})

const isExpired = (loginDate) => {
  const now = new Date()
  return Math.abs(now - loginDate) / 1000 / 60 / 60 > 2
}

module.exports = router