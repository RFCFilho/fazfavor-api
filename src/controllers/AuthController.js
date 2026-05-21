const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const Usuario = require('../models/Usuario');

class AuthController {

    async login(req, res) {

        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({
            where: { email }
        });

        if (!usuario) {

            return res.status(401).json({
                message: 'Usuário não encontrado'
            });

        }

        const senhaValida = await usuario.checkPassword(senha);

        if (!senhaValida) {

            return res.status(401).json({
                message: 'Senha inválida'
            });

        }

        const token = jwt.sign(

            { id: usuario.id },

            authConfig.secret,

            {
                expiresIn: authConfig.expiresIn
            }

        );

        return res.json({

            message: 'Login realizado com sucesso!',

            token,

            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }

        });

    }

}

module.exports = new AuthController();