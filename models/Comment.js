const { Sequelize, Model, DataTypes } = require('sequelize')


class Comment extends Model {

}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    
})

// come back for hooks
module.exports = Comment