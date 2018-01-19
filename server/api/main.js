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

module.exports = router;