import Express from 'express'
import Users from '../../db/Users'

const router = Express.Router();

router.get('/user', function(req, res) {
  Users.find({},(err, data)=> {
    if(err) {
      res.status(500);
    }
    res.json(data);
  });
});


router.post('/addUser', function(req, res) {
  const {username,email,password,auth,isAdmin} = req.body;
  let tmpUser = new Users({
    username,
    email,
    password,
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
  const {_id, name, editTime} = req.body;
  Users.update({_id: _id}, {userName: name,editTime: editTime},(err, data) => {
    if(err){
      console.error(err);
      res.json({code: 1});
    }
    res.json({code: 0});
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
    res.json({code: 0});
  } else {
    res.json({code: 1});
  }
})

module.exports = router