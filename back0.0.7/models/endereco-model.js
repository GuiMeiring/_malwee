const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Endereco', {
        id:{
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        status:{
            type : Sequelize.INTEGER,
            allowNull : false
        },
        cep:{
            type: Sequelize.STRING(14),
            allowNull: false,
        },
        rua:{
            type: Sequelize.STRING(60),
            allowNull: false,
        },
        bairro:{
            type: Sequelize.STRING(60),
            allowNull: false,
        },
        cidade:{
            type: Sequelize.STRING(60),
            allowNull: false,
        },
        numero:{
            type: Sequelize.INTEGER(),
            allowNull:false,
        },
        fkClients:{
            type:Sequelize.INTEGER,
            allowNull:false
        }


      
    })
}  