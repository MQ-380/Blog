import Express from 'express'
import Users from '../../db/Users'

const router = Express.Router();

const bcrypt = require('bcryptjs');

router.get('/user', function(req, res) {
  Users.find({},(err, data)=> {
    if(err) {
      res.status(500);
    } else {
      data = data.map((item) => (
        {username: item.username, _id: item._id, email: item.email, isAdmin: item.isAdmin, auth: item.auth}
      ))
      res.json(data);
    }
  });
});


router.post('/addUser', function(req, res) {
  const {username,email,password,auth,isAdmin} = req.body;
  let tmpUser = new Users({
    username,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    isAdmin,
    auth,
  })
  tmpUser.save().then(() => {
    res.json({code: 0})
  }).cancel(err => {
    console.log(err);
    res.json({code: 1})
  })
})

router.post('/editUser', function(req, res) {
  const {_id, newEmail} = req.body;
  Users.update({_id: _id}, {email: newEmail},(err) => {
    if(err){
      console.error(err);
      res.json({status: false});
    }
    res.json({status: true, email: newEmail});
  })
})

router.post('/deleteUser', (req,res) => {
  const {_id} = req.body;
  let failedItem = [];
  _id.split(',').forEach((item) => {
    Users.remove({_id: item}, (err) => {
      if(err) {
        console.log(err);
        failedItem.push(item);
      }
    })
  })
  if(failedItem.length !== 0) {
    res.json({code: 1});
  } else {
    res.json({code: 0});
  }
})

router.post('/editPassword', (req, res) => {
  const {oldPass, newPass, userId} = req.body;
  Users.find({_id:userId}, (err, data)=> {
    if(bcrypt.compareSync(oldPass, data[0].password)) {
      if (err) {
        res.json({status: false, msg: '请检查连接'})
      } else {
        Users.update({_id: userId}, {password: bcrypt.hashSync(newPass, bcrypt.genSaltSync(10))},
          (err) => {
            if (err) {
              res.json({status: false, msg: '请检查数据库连接'})
            } else {
              res.json({status: true, msg: '修改密码成功'})
            }
          })
      }
    } else {
      res.json({status: false, msg: '旧密码错误，请检查旧密码。'})
    }
  })
})

module.exports = router