const { Sequelize, Model, DataTypes } = require('sequelize')


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
    
    
})

// come back for hooks
module.exports = Post