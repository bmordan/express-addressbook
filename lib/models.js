const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class User extends Model {}

User.init({
    username: DataTypes.STRING
}, {sequelize: db, modelName: 'user'})

module.exports = User
