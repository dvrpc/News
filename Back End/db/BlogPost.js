'use strict'
const { STRING, TEXT } = require('sequelize')
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
    author: {
        type: STRING,
        allowNull: true
    },
    img: {
        type: TEXT,
        allowNull: false
    },
    blurb: {
        type: TEXT,
        allowNull: false
    },
    type: {
        type: STRING,
        allowNull: false
    }
})