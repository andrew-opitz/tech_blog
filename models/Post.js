const { Sequelize, Model, DataTypes } = require('sequelize')
const db = require('../config/connection')
const dayjs = require('dayjs')

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
    },
    date: {
        type: DataTypes.VIRTUAL,
        get () {
            return dayjs(this.createdAt).format('MM/DD/YYYY hh:mma')
        } 
    }
    
}, {
    modelName: 'user_posts',
    sequelize: db,
})


module.exports = Post