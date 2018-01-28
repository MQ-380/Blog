import Express from 'express'
import Users from '../../db/users'

const router = Express.Router();

router.get('/user', function(req, res) {
  Users.find({},(err, data)=> {
    if(err) {
      res.status(500);
    }
      console.log(data);
      res.json(data);
  });
});


router.post('/addUser', function(req, res) {
  const {userName,time} = req.body;
  let tmpUser = new Users({
    userName,
    time
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
  Users.remove({_id}, (err)=>{
    if(err) {
      console.log(err);
      res.json({code: 1});
    }
    res.json({code: 0});
  })
})

module.exports = router