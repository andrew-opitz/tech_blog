const { Sequelize, Model, DataTypes } = require('sequelize')
const db = require('../config/connection')
const { hash, compare } = require('bcrypt')
const Post = require('./Post')


class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: 'That email address is already in use.'
        },
        validate: {
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6],
            msg: 'Password must be at least 6 characters in length.'
        }
    }
}, {
    modelName: 'user',
    sequelize: db,
    hooks: {
        async beforeCreate(user) {
            user.password = await hash(user.password, 10)

            return user
        }
    }
})

User.prototype.validatePass = async function (form_password) {
    const is_valid = await compare(form_password, this.password);
  
    return is_valid;
  }
User.hasMany(Post, { as: 'posts', foreignKey: 'author_id'})
Post.belongsTo(User, { as: 'author', foreignKey: 'author_id'})

module.exports = User