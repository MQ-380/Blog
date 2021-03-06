import Express from 'express'
import Users from '../../db/Users'
import Article from '../../db/Article'
import { io } from '../../server/api/apiServer'

const bcrypt = require('bcryptjs')
const uuidv4 = require('uuid')

const router = Express.Router();

router.post('/login', (req, res) => {
  let {username, password} = req.body
  Users.find({username: username}, (err, data) => {
    if (err) {
      res.json({status: false, msg: '请检查数据库'})
    }
    if (data.length === 0) {
      res.json({status: false, msg: '用户不存在，请检查用户名！'})
    } else {
      if (bcrypt.compareSync(password, data[0].password)) {
        const loginToken = uuidv4();
        Users.update(
          {username: username},
          {loginToken, loginTime: new Date()},
          err => {
            if (err) {
              console.log(err)
              res.json({status: false, msg: '请检查数据库'})
            }
            Article.find({}, (err, e) => {
              let noticedNumber = 0
              if (!err) {
                e.forEach(i => {
                  i.comment.forEach(c => {
                    if (!c.reviewed) noticedNumber += 1
                  })
                })
                res.json({
                  status: true,
                  isAdmin: data[0].isAdmin,
                  token: loginToken,
                  id: data[0]._id,
                  email: data[0].email,
                  slogan: data[0].slogan,
                  links: data[0].links,
                  notice: noticedNumber,
                })
              }
            })
          }
        )
      } else {
        res.json({status: false, msg: '密码错误'})
      }
    }
  });
});

router.post('/loginCheck', (req, res) => {
  let {token} = req.body
  Users.find({loginToken: token}, (err, data) => {
    if (err) {
      res.json({status: false, msg: '请检查网络'})
    } else {
      if (!data[0]) {
        res.json({status: false, msg: '您的账号已经在别处登录，本地已下线'})
      } else {
        if (isExpired(data[0].loginTime)) {
          Users.update(
            {username: data[0].username},
            {loginToken: '', loginTime: null},
            err => {
              if (err) {
                console.log(err)
                res.json({status: false, msg: '请检查网络'})
              }
              res.json({status: false, msg: '当前登录已经过期，请重新登录'})
            }
          )
        } else {
          Article.find({}, (err, e) => {
            let noticedNumber = 0
            if (!err) {
              e.forEach(i => {
                i.comment.forEach(c => {
                  if (!c.reviewed) noticedNumber += 1
                })
              })
              res.json({
                status: true,
                isAdmin: data[0].isAdmin,
                username: data[0].username,
                id: data[0]._id,
                email: data[0].email,
                slogan: data[0].slogan,
                links: data[0].links,
                notice: noticedNumber,
              })
            }
          })
        }
      }
    }
  });
});

router.post('/logout', (req, res) => {
  let {username} = req.body
  Users.find({username}, (err, data) => {
    if (err) {
      res.json({status: false, message: '退出登录失败，请检查网络'})
    } else {
      if (!data[0]) {
        res.json({status: false, message: '退出登录失败，请检查网络'})
      } else {
        Users.update({username}, {loginToken: '', loginTime: null}, err => {
          if (err) {
            console.log(err);
            res.json({status: false, message: '退出登录失败，请检查网络'})
          }
          res.json({status: true})
        });
      }
    }
  });
});

const isExpired = loginDate => {
  const now = new Date()
  return Math.abs(now - loginDate) / 1000 / 60 / 60 > 2
}

module.exports = router
