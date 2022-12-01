const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('ProdRequests', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkRequests:{
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fkProducts:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        amount:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        unitPrice:{
            type: Sequelize.DECIMAL(10,2),
            allowNull:false
        },
        discount:{
            type: Sequelize.DECIMAL(10,2),
            allowNull:false
        },
        increase:{
            type: Sequelize.DECIMAL(10,2),
            allowNull:false
        },
        total:{
            type:Sequelize.DECIMAL(10,2),
            allowNull:false
        },
    })
}