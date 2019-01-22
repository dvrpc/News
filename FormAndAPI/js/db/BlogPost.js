'use strict'
const { STRING } = require('sequelize')
const db = require('./index.js')

// Model for BlogPosts
module.exports = db.define('BlogPost', {
    title: {
        type: STRING,
        allowNull: false
    },
    link: {
        type: STRING,
        allowNull: false
    },
    img: {
        type: STRING,
        allowNull: false
    },
    blurb: {
        type: STRING,
        allowNull: false
    },
    type: {
        type: STRING,
        allowNull: false
    }
})