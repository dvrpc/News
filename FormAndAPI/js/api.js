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
// get (up to) the 16 most recent posts from the db
api.get('/getTop16', (req, res, next) => {
    BlogPost.findAll({
        limit: 16,
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
    .then(post => res.send(post))
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

module.exports = api