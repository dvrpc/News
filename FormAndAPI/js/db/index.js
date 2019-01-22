// DB Index
const sequelize = require('sequelize')
const debug = require('debug')('sql')
const pkg = require('../../package.json')

const name = process.env.DATABASE_NAME || pkg.name
// @TOOD: update the path after I make the db
const connectionString = process.env.DATABASE_connectionString || `postgres://localhost:9000/${name}`;

const db = module.exports = new sequelize(connectionString, {
    logging: debug,
    native: true
})

// sync the db. force true for now to create/recreate w/dummy data
function sync(force=true) {
    return db.sync({force})
    .then(ok => console.log('synced models to db ', connectionString))
    .catch(fail => {
        console.log('db failed to sync)')
    })
}

db.didSync = sync()