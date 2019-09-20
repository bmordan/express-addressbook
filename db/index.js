const {Sequelize} = require('sequelize')
const source = process.env.NODE_ENV === "test" ? ":memory:" : "./database.db"
module.exports = new Sequelize(`sqlite:${source}`)
