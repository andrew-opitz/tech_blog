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
    
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 50],
                msg: 'Username must be at least 2 characters in length.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 50],
                msg: 'Password must be at least 6 characters in length.'
            }
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