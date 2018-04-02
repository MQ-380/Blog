import Express from 'express'
import fs from 'fs'
import Article from '../../db/Article'
import { socket } from '../../server/api/apiServer'

let multer = require('multer')
let marked = require('marked')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'articles/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

let upload = multer({storage: storage}).single('md')

const router = Express.Router()

router.post('/markdownUpload', function (req, res) {
  upload(req, res, err => {
    if (err) {
      res.json({status: false})
    } else {
      res.json({status: true})
    }
  });
});

router.post('/deleteFile', (req, res) => {
  const {fileName} = req.body
  fs.unlink(`articles/${fileName}`, err => {
    if (err) {
      console.log(err)
      res.json({status: false})
    }
    res.json({status: true})
  });
});

router.post('/uploadInfo', (req, res) => {
  const {fileName, linkName, articleName, tags, writer} = req.body
  let newArticle = new Article({
    fileName,
    linkName: `${writer}/${linkName}`,
    articleName,
    writer,
    tags: tags !== '' ? tags.split(',') : [],
    createTime: new Date(),
    editTime: new Date(),
    comment: [],
    fileType: 'upload'
  });
  if (!fs.existsSync(`articles/${writer}`)) {
    fs.mkdirSync(`articles/${writer}`);
  }
  fs.rename(`articles/${fileName}`, `articles/${writer}/${fileName}`, err => {
    if (err) {
      console.error(err);
    } else {
      newArticle.save(err => {
        if (err) {
          console.log(err)
          res.json({status: false})
        } else {
          res.json({status: true})
        }
      });
    }
  });
});

router.post('/editInfo', (req, res) => {
  const {title, newFile, oldFile, tags, linkName, writer, id} = req.body
  Article.findOne({_id: id}, (err, data) => {
    let newArticle = {
      tags: tags !== '' ? tags.split(',') : [],
      editTime: new Date(),
      articleName: title,
      fileName: newFile
    };
    if (err) {
      console.log(err);
    } else {
      const linkNameOld = data.linkName;
      if (linkNameOld !== linkName) {
        newArticle = {
          linkName: `${writer}/${linkName}`,
          tags: tags !== '' ? tags.split(',') : [],
          editTime: new Date(),
          articleName: title,
          fileName: newFile
        };
      }
      if (fs.existsSync(`articles/${newFile}`)) {
        fs.unlink(`articles/${writer}/${oldFile}`, err => {
          if (err) {
            console.error(err);
          }
        });
        fs.rename(
          `articles/${newFile}`,
          `articles/${writer}/${newFile}`,
          err => {
            if (err) {
              console.error(err)
            } else {
              Article.update({_id: id}, newArticle, err => {
                if (err) {
                  console.log(err)
                  res.json({status: false})
                } else {
                  res.json({status: true})
                }
              })
            }
          }
        )
      } else {
        console.log(newArticle)
        Article.update({_id: id}, newArticle, err => {
          if (err) {
            console.log(err)
            res.json({status: false})
          } else {
            res.json({status: true})
          }
        });
      }
    }
  });
});

router.post('/publishArticle', (req, res) => {
  const {title, content, contentType, tags, writer, linkName} = req.body
  let contentBuffer = new Buffer(content)
  let fileName = `articles/${writer}/${title}.${contentType}`
  for (let i = 0; fs.existsSync(fileName); i++) {
    fileName = `articles/${title + i}.${contentType}`
  }
  let newArticle = new Article({
    linkName: `${writer}/${linkName}`,
    writer,
    fileName: `${title}.${contentType}`,
    articleName: title,
    tags: tags !== '' ? tags.split(',') : [],
    createTime: new Date(),
    editTime: new Date(),
    comment: [],
    fileType: contentType
  });

  newArticle.save(err => {
    if (err) {
      console.log(err)
      res.json({status: false})
    } else {
      fs.writeFile(fileName, contentBuffer, err => {
        if (err) {
          console.error(err)
          res.json({status: false})
        } else {
          res.json({status: true})
        }
      });
    }
  });
});

router.post('/editArticle', (req, res) => {
  const {id, articleName, linkName, content, tags} = req.body
  Article.findOne({_id: id}, (err, data) => {
    if (err) {
      console.error(err)
      res.json({status: false})
    } else {
      const {fileName, writer} = data
      const linkNameOld = data.linkName;
      fs.writeFile(
        `articles/${writer}/${fileName}`,
        new Buffer(content),
        err => {
          if (err) {
            console.error(err)
          } else {
            let editedArticle;
            if (linkNameOld === linkName) {
              editedArticle = {
                articleName,
                editTime: new Date(),
                tags: tags !== '' ? tags.split(',') : []
              };
            } else {
              editedArticle = {
                articleName,
                linkName: `${writer}/${linkName}`,
                editTime: new Date(),
                tags: tags !== '' ? tags.split(',') : []
              };
            }
            Article.update({_id: id}, editedArticle, err => {
              if (err) {
                console.error(err)
                res.json({status: false})
              } else {
                res.json({status: true})
              }
            });
          }
        }
      );
    }
  });
});

router.get('/getArticleList', (req, res) => {
  Article.find({}, (err, data) => {
    if (err) {
      console.error(err)
      res.status(500)
    } else {
      socket.emit('new_comment', 'new at data')
      res.json(data)
    }
  });
});

router.post('/deleteArticle', (req, res) => {
  const {_ids} = req.body
  let failedItem = [];
  _ids.split(',').forEach(item => {
    Article.findOne({_id: item}, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const {fileName} = data
        Article.remove({_id: item}, err => {
          if (err) {
            console.error(err)
            failedItem.push(item)
          } else {
            fs.unlink(`articles/${fileName}`, err => {
              if (err) {
                console.error(err);
                failedItem.push(item);
              }
            });
          }
        });
      }
    });
  });
  if (failedItem.length !== 0) {
    res.json({status: false})
  } else {
    res.json({status: true})
  }
});

router.post('/getArticleContent', (req, res) => {
  let {_id} = req.body
  Article.find({_id}, (err, data) => {
    if (err) {
      console.error(err)
      res.json({status: false})
    } else {
      const {fileName, fileType, writer} = data[0]
      fs.readFile(`articles/${writer}/${fileName}`, 'utf8', (err, data) => {
        if (err) {
          console.error('err')
          res.json({status: false})
        } else {
          res.json({status: true, content: data, fileType})
        }
      });
    }
  });
});

router.post('/reviewComment', (req, res) => {
  let {commentId, articleId, passed} = req.body
  Article.findOne({_id: articleId}, (err, data) => {
    if (err) {
      console.error(err)
      res.json({status: false})
    } else {
      let comment = data.comment
        .map(item => {
          if (item.id === commentId) {
            passed = passed === 'true'
            if (passed) {
              item.reviewed = true
            } else if (!passed && item.reviewed) {
              item.reviewed = false
            } else {
              return undefined
            }
          }
          return item
        })
        .filter(item => !!item).map(i => {
          commentId = parseInt(commentId)
          if (i.refId === commentId || i.lastRef === commentId) {
            if (passed) {
              i.refId = i.lastRef
            } else {
              i.lastRef = i.refId
              i.refId = -1
            }
          }
          return i
        })
      Article.update({_id: articleId}, {comment}, err => {
        if (err) {
          console.error(err)
          res.json({status: false})
        } else {
          res.json({status: true, comment: comment, articleId: articleId})
        }
      });
    }
  });
});

module.exports = router
