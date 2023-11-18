const { Sequelize } = require('sequelize')
require('dotenv').config()

const production = process.env.PORT
let sequelize

if (production) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  })

}

module.exports = sequelize