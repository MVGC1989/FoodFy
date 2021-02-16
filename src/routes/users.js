const express = require("express")
const routes = express.Router()

const UserController = require("../app/controllers/UserController")
const SessionController = require("../app/controllers/SessionController")

const UserValidator = require("../app/validators/user")
const SessionValidator = require("../app/validators/session")


const { onlyUsers, userIsLogged, userNotLogged } = require("../app/middlewares/session")

//LOGIN-LOGOUT 
routes.get('/login', userIsLogged, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', onlyUsers ,SessionController.logout)

//RECUPERAR SENHA
routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot) 
routes.get('/password-reset', SessionController.resetForm) 
routes.post('/password-reset', SessionValidator.reset, SessionController.reset) 


//CADASTRO DE USUÁRIOS

//ROTA PARA ADMIN VER A LISTA DE USUÁRIOS
routes.get('/', onlyUsers , userNotLogged, UserController.index)

// ROTAS PARA CRIAR USUÁRIOS 
routes.get('/create', onlyUsers, userNotLogged, UserController.create)
routes.post('/create', onlyUsers, userNotLogged, UserValidator.post, UserController.post)

// ROTAS PARA O ADMIN ATUALIZAR OUTROS USUÁRIOS
routes.get('/:id/edit', onlyUsers, userNotLogged, UserValidator.edit, UserController.edit)
routes.put('/', onlyUsers, userNotLogged, UserValidator.update, UserController.update)

// ROTA PARA DELETAR USUÁRIOS
routes.delete('/', onlyUsers, userNotLogged, UserController.delete)

module.exports = routes