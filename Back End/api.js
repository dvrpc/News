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
        limit: 16,
        order: [['createdAt', 'DESC']]
    })
    .then(posts => res.send(posts))
    .catch(next)
})

// get all posts for the archive page
api.get('/getAll', (req, res, next) => {
    BlogPost.findAll({})
    .then(posts => res.send(posts))
    .catch(next)
})

// find the post(s) to edit
api.get('/getPost/:title', (req, res, next) => {
    BlogPost.findAll({
        where: {
            title: req.params.title
        } 
    })
    .then(post => post.length ? res.send(post) : res.status(404).send('Post not found'))
    .catch(next)
})

// find a post by id for link sharing
api.get('/getPublicPost/:id', (req, res, next) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(post => post ? res.send(post) : res.status(404).send('Post not found'))
    .catch(next)
})

// update the edited post
api.put('/updatePost/:id', (req, res, next) => {
    return BlogPost.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: false
    })
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(next)
})

// delete a selected post
api.delete('/deletePost/:id', (req, res, next) => {
    BlogPost.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(destroyed => destroyed ? res.status(204).send() : res.status(404).send())
    .catch(next)
})

module.exports = api