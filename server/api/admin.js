import Express from 'express'
import User from '../../db/users'

const router = Express.Router();

router.post('/userdd', function(req, res) {

  User.find({},).then(data => {
    res.json(data);
  }).catch(err => {
    res.status(500);
  })
});

module.exports = router;