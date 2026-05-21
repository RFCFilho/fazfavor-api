const bcrypt = require('bcryptjs');//import da dependência que transforma senhas comuns em ecryptada

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../database/connection');

class Usuario extends Model {

    checkPassword(senha) {

        return bcrypt.compare(senha, this.senha);

    }

}

Usuario.init({

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    telefone: {
        type: DataTypes.STRING
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {

    sequelize,
    modelName: 'Usuario',

    hooks: {

        beforeCreate: async (usuario) => {

            usuario.senha = await bcrypt.hash(usuario.senha, 8);

        }

    }

}); //esta função cryptografa a senha antes dela ser salva 

module.exports = Usuario;