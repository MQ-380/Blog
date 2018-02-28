import Express from 'express'
import fs from 'fs'

let multer = require('multer')

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'articles/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

let upload = multer({storage: storage}).single('md')

const router = Express.Router();

router.post('/markdownUpload', function(req, res) {
  upload(req, res, (err)=> {
    if(err) {
      res.json({status: false})
    }else {
      res.json({status: true});
    }
  })
})

router.post('/deleteFile', (req, res) => {
  const {fileName} = req.body;
  fs.unlink(`articles/${fileName}`, (err) => {
    if(err) {
      console.log(err);
      res.json({status: false})
    }
    res.json({status: true})
  })
})

module.exports = router