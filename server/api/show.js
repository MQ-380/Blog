import Express from 'express'
import Users from '../../db/Users'
import Article from '../../db/Article'
import fs from 'fs'

const router = Express.Router()

router.post('/checkUser', (req, res) => {
  let {username} = req.body
  Users.find({username: username}, (err, data) => {
    if (!err) {
      if (data.length !== 0) {
        Article.find({writer: username}, (err, articles) => {
          if (!err) {
            return res.json({
              status: true,
              userData: {
                username,
                slogan: data[0].slogan,
                links: data[0].links,
                articleTags: getTagsWithArticleId(articles),
                allArticles: getAllArticles(articles)
              }
            });
          }
        });
      } else {
        return res.json({status: false})
      }
    }
  });
});

router.post('/getArticleInfo', (req, res) => {
  let {linkName} = req.body
  Article.find({linkName}, (err, item) => {
    if (!err) {
      if (item.length !== 0) {
        const {
          _id,
          writer,
          fileName,
          articleName,
          fileType,
          createTime,
          editTime,
          tags,
          linkName,
          comment,
          readNumber,
        } = item[0]
        Article.update({linkName}, {readNumber: readNumber + 1}, (err => {
          if (!err) {
            try {
              let content = fs.readFileSync(`articles/${writer}/${fileName}`, 'utf8')
              let c = comment.filter(i => i.reviewed === true)
              c = c.map(i => {
                if (i.refId !== '' && c.findIndex(e => parseInt(e.id) === i.refId) === -1) {
                  i.refId = -1
                  return i
                } else {return i}
              })
              return res.json({
                status: true,
                fullInfo: {
                  _id,
                  articleName,
                  fileType,
                  writer,
                  createTime,
                  editTime,
                  tags,
                  content,
                  linkName,
                  readNumber,
                  comment: c
                }
              })
            } catch (err) {
              console.error(err)
            }
          }
        }))
      }
    } else {
      return res.json({status: false})
    }
  });
});

router.post('/publishComment', (req, res) => {
  let {id, content, author, refId, articleId} = req.body
  Article.find({_id: articleId}, (err, data) => {
    if (!err) {
      let {comment} = data[0]
      comment.push({
        id: id,
        content: content,
        reviewed: false,
        author: author,
        time: new Date(),
        refId: refId
      })
      data[0].comment = comment
      Article.update({_id: articleId}, data[0], (err) => {
        if (!err) {
          res.json({status: true})
        } else {
          res.json({status: false})
        }

      })
    }
  })
})

router.post('/tagCheck', (req, res) => {
  let {tag} = req.body
  Article.find({}, (err, allArticle) => {
    if (!err) {
      let tagArticle = getTagsWithArticleId(allArticle).filter(i => i.tags === tag)
      if (tagArticle.length === 0) return res.json({status: false})
      let tags = tagArticle.map(i => ({
        tagName: i.tags,
        allArticles: getAllArticles(i.aId.map(a => allArticle.filter(s => s._id === a)[0]))
      }))[0]
      return res.json({status: true, info: tags})
    }
    return res.json({status: false})
  })
})

router.post('/getInfo', (req, res) => {
  Users.find({}, (error, allUser) => {
    if (!error) {
      Article.find({}, (err, allArticle) => {
        if (!err) {
          let info = {
            writers: Array.from(new Set(allArticle.map(i => i.writer))),
            articles: getAllArticles(allArticle),
            userList: allUser.map(i => ({username: i.username})),
            tags: getTagsWithArticleId(allArticle)
          }
          return res.json({status: true, info})
        } else {
          return res.json({status: false})
        }
      })
    }
  })
})

module.exports = router

const getTagsWithArticleId = articles => {
  let tags = articles
    .map(
      item =>
        item.tags.length !== 0
          ? {articleId: item._id, tags: item.tags}
          : undefined
    )
    .filter(i => i);
  return []
    .concat(
      ...tags.map(item =>
        item.tags.map(i => ({tags: i, aId: item.articleId}))
      )
    )
    .reduce((before, now) => {
      if (!Array.isArray(before)) {
        before = [].concat(before)
      }
      let isCombined = false
      before = before.map(item => {
        if (!isCombined && item.tags === now.tags) {
          isCombined = true
          return {
            tags: item.tags,
            aId: [].concat(item.aId, now.aId)
          };
        } else {
          return item
        }
      });
      if (!isCombined) {
        return before.concat(now)
      }
      return before
    })
    .map(item => {
      if (!Array.isArray(item.aId)) {
        return {tags: item.tags, aId: [item.aId]}
      }
      return item
    });
};

const getAllArticles = articles =>
  articles.map(item => {
    const {writer, fileName} = item
    let data = fs.readFileSync(`articles/${writer}/${fileName}`, 'utf8')
    return {
      id: item._id,
      articleName: item.articleName,
      fileType: item.fileType,
      writer: item.writer,
      createTime: item.createTime,
      editTime: item.editTime,
      tags: item.tags,
      linkName: item.linkName,
      content: data.slice(0, Math.min(data.length, 500))
    };
  });
