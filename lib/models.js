const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class User extends Model {}
class Contact extends Model {}

User.init({
    username: DataTypes.STRING
}, {sequelize: db, modelName: 'user'})

Contact.init({
    name: DataTypes.STRING,
    tel: DataTypes.INTEGER
}, {sequelize: db, modelName: 'contact'})

User.hasMany(Contact)
Contact.belongsTo(User)

module.exports = {User, Contact}
