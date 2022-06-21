const Posts = require('../model/postsM');
const fs = require('fs');
const User = require('../model/userM');
const Comment = require('../model/commentM');
const { json } = require('express/lib/response');

//////////// GET ALL POSTS ////////////
exports.getAllPosts = (req, res) => {
  Posts.findAll({
    include: [
      { model: User, attributes: ['userName'] },
      { model: Comment, include: { model: User, attributes: ['userName'] } }
    ],
    order:[['createdAT', 'desc']]
  })
    .then((posts) => { res.status(200).json(posts); })
    .catch((error) => { res.status(400).json({ error: error }); });
};
//////////////////////////////////////////////////

//////////////// GET ONE POST ////////////////
exports.getOnePosts = (req, res) => {
  Posts.findOne({ where: { id: req.params.id } })
    .then((posts) => { res.status(200).json(posts); })
    .catch((error) => { res.status(404).json({ error: error }); });
};
//////////////////////////////////////////////////

////////////////// CREATE POST //////////////////
exports.createOnePosts = (req, res) => {
  const postObject = JSON.parse(req.body.post)
  Posts.create({
    title: postObject.title,
    content: postObject.content,
    userId: req.auth.userId,
    imageUrl: (req.file)?`${req.protocol}://${req.get('host')}/images/${req.file.filename}`:null
  })
    .then((posts) => { res.status(200).json(posts); })
    .catch((error) => { res.status(400).json({ error: error }); });
};
//////////////////////////////////////////////////

//////////////// UPDATE POST ////////////////
exports.updateOnePosts = (req, res, next) => {
  
    const postObject = JSON.parse(req.body.post)
    Posts.findOne({ where: { id: req.params.id } })
      .then(post => {
        if (post.userId !== req.auth.userId && !req.auth.admin) {
            res.status(400).json({ error: 'Unauthorized modification' });
          } else {

        if (req.file) {
          post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        post.title = postObject.title;
        post.content = postObject.content;
        post.save()
          .then(() => res.status(200).json({ message: 'Post modify' }))
          .catch(error => res.status(400).json({ error }));
      }
    }) 
};
//////////////////////////////////////////////////

////////////////// DELETE POST //////////////////
exports.deleteOnePosts = (req, res, next) => {
  Posts.findOne({ where: { id: req.params.id } })
    .then((posts) => {

      // SECURITY CHECK //
      if (posts.userId !== req.auth.userId && !req.auth.admin) {
        res.status(400).json({ error: 'Unauthorized suppression' });
      } else {
        if(posts.imageUrl) {
          const filename = posts.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Posts.destroy({ where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: 'Post deleted' }))
              .catch(error => res.status(400).json({ error }));
          })
        }else{
          Posts.destroy({ where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: 'Post deleted' }))
              .catch(error => res.status(400).json({ error }));
        }
      }
    })
    .catch(error =>{ 
      res.status(500).json({ error })
    });
};
//////////////////////////////////////////////////