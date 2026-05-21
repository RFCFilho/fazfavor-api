const authMiddleware = require('../middlewares/auth');// Import do auth de proteção das rotas menos o login

const AuthController = require('../controllers/AuthController'); //Esta variável importa o AuthController(class)

const express = require('express');

const UsuarioController = require('../controllers/UsuarioController');

const CaronaController = require('../controllers/CaronaController');

const routes = express.Router();

routes.post('/v1/login', AuthController.login); //Esta é a rota para o AuthControler ou Rota do login

routes.use(authMiddleware); //Proteção das rotas

routes.get('/v1/caronas', CaronaController.index);

routes.get('/v1/caronas/:id', CaronaController.show);

routes.post('/v1/caronas', CaronaController.store);

routes.put('/v1/caronas/:id', CaronaController.update);

routes.delete('/v1/caronas/:id', CaronaController.destroy);

routes.get('/v1/usuarios', UsuarioController.index);

routes.get('/v1/usuarios/:id', UsuarioController.show);

routes.post('/v1/usuarios', UsuarioController.store);

routes.put('/v1/usuarios/:id', UsuarioController.update);

routes.delete('/v1/usuarios/:id', UsuarioController.destroy);


module.exports = routes;
//Neste arquivo criaremos as rotas versionadas
//O express.Router() cria os gruppos de rotas. 
//routes.get() - Cria a rota GET
// o return res.jason - retorna os JSON
// E é claro o module.exports - exporta as rotas
