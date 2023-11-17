const { Sequelize, Model, DataTypes } = require('sequelize')
const db = require('../config/connection')

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
    
    
}, {
    modelName: 'user',
    sequelize: db,

})

// come back for hooks
module.exports = Comment