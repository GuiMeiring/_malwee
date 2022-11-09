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
        rua:{
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        bairro:{
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        cidade:{
            type: Sequelize.STRING(60),
            allowNull: false,
        },
        estado:{
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        cep:{
            type: Sequelize.STRING(14),
            allowNull:false,
        },
        numero:{
            type: Sequelize.INTEGER(),
            allowNull:false,
        },
        complemento:{
            type: Sequelize.STRING(100),
            allowNull:true,
        },
        pontoDeReferencia:{
            type: Sequelize.STRING(100),
            allowNull:true,
        },
        fkClients:{
            type:Sequelize.INTEGER,
            allowNull:false
        }


      
    })
}  