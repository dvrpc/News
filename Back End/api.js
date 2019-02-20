'use strict'
const api = require('express').Router()
const models = require('./db/models')
const BlogPost = models.BlogPost


/****** Add new Posts to the DB ******/
// create a new post
api.post('/addPost', (req, res, next) => {
    BlogPost.create(req.body).then(post => {
        res.json({
            title: post.title,
            link: post.link,
            img: post.img,
            blurb: post.blurb,
            type: post.type
        })
    }).catch(next)
})


/****** Let users retrieve and edit posts ******/
// get (up to) the 18 most recent posts from the db
api.get('/getTop18', (req, res, next) => {
    BlogPost.findAll({
        limit: 18,
        order: [['updatedAt', 'DESC']]
    })
    .then(posts => res.send(posts))
    .catch(next)
})

// find the post to edit
api.get('/getPost/:title', (req, res, next) => {
    BlogPost.findOne({
        where: {
            title: req.params.title
        } 
    })
    .then(post => post ? res.send(post) : res.status(404).send('Post not found'))
    .catch(next)
})

// update the edited post
api.put('/updatePost/:title', (req, res, next) => {    
    return BlogPost.update(req.body, {
        where: {
            title: req.params.title
        },
        returning: false
    })
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(next)
})

// delete a selected post
api.delete('/deletePost/:title', (req, res, next) => {
    // destroy() needs id, so use title to pull the entry from the db and then use its id to call destroy()
    BlogPost.findOne({
        where: {
            title: req.params.title
        }
    })
    .then(post => {
        BlogPost.destroy({
            where: {id: post.id}
        })
        .then(destroyed => destroyed ? res.status(204).send() : res.status(404).send())
        .catch(next)
    })
    .catch(next)
})

module.exports = api