// DB Index
const sequelize = require('sequelize')
const debug = require('debug')('sql')
const pkg = require('../package.json')
require('dotenv').load()

const name = pkg.name
const credentials = encodeURIComponent(process.env.CREDENTIALS)
const connectionString = `postgres://${credentials}@10.1.1.194:5432/${name}`;

const db = module.exports = new sequelize(connectionString, {
    logging: debug,
    operatorsAliases: false
})

// run our model definitions after creating the jawn
require('./models.js')

// sync the db. force true for now to create/recreate w/dummy data 
    //@TODO: remember to change to force=FALSE once this is up and running
function sync(force=true) {
    return db.sync({force})
    .then(ok => console.log('synced models to db ', connectionString))
    .catch(fail => {
        console.log('db failed to sync because: ', fail)
    })
}

db.didSync = sync()