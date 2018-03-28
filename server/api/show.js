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
            })
          }
        })
      } else {
        return res.json({status: false})
      }
    }
  });
});

module.exports = router

const getTagsWithArticleId = (articles) => {
  let tags = articles
    .map(
      item =>
        item.tags.length !== 0
          ? {articleId: item._id, tags: item.tags}
          : undefined
    )
    .filter(i => i)
  return []
    .concat(
      ...tags.map(item =>
        item.tags.map(i => ({tags: i, aId: item.articleId}))
      )
    )
    .reduce((before, now) => {
      if (!Array.isArray(before)) before = [].concat(before)
      let isCombined = false
      before = before.map(item => {
        if (!isCombined && item.tags === now.tags) {
          isCombined = true
          return {
            tags: item.tags,
            aId: [].concat(item.aId, now.aId)
          }
        } else {
          if (!Array.isArray(item.aId))
            item = {tags: item.tags, aId: [item.aId]}
          return item
        }
      })
      if (!isCombined) {
        return before.concat(now)
      }
      return before
    })
}

const getAllArticles = (articles) => (
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
    }
  })
)
