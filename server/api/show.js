import Express from 'express'
import Users from '../../db/Users'

const router = Express.Router()

router.post('/checkUser', (req, res) => {
  let {username} = req.body
  Users.find({username: username}, (err, data) => {
    if (!err) {
      if (data.length !== 0) {
        return res.json({
          status: true,
          slogan: data[0].slogan,
          links: data[0].links
        })
      }
      return res.json({status: false})
    }
  });
});

module.exports = router
