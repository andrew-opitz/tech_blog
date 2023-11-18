const { Sequelize, Model, DataTypes } = require('sequelize')
const db = require('../config/connection')

class Post extends Model {

}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    modelName: 'user_posts',
    sequelize: db,
})


module.exports = Post