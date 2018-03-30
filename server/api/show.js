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
          comment
        } = item[0]
        try {
          let content = fs.readFileSync(`articles/${writer}/${fileName}`, 'utf8')
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
              comment
            }
          })
        } catch (err) {
          console.error(err)
        }
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
        noticed: false,
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
