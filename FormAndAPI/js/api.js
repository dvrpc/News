'use strict'
const api = require('express').Router()
const models = require('./db/models')
const BlogPost = models.BlogPost


/****** Add new Posts to the DB ******/
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
api.get('/getTop16', (req, res, next) => {
    // get the 16 most recent posts from the db
    BlogPost.findAll({
        limit: 16,
        order: [['updatedAt', 'DESC']]
    })
    .then(posts => res.send(posts))
    .catch(next)
})

api.get('/getPost/:id', (req, res, next) => {
    BlogPost.findById(req.params.id)
    .then(post => res.send(post))
    .catch(next)
})

api.put('/updatePost/:id', (req, res, next) => {
    return BlogPost.update(req.body, {
        where: {id: req.params.id},
        // @TODO: look into if this should be returning true/false
        returning: false
    })
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(next)
})

module.exports = api