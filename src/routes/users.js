const express = require("express")
const routes = express.Router()

const UserController = require("../app/controllers/UserController")

const SessionController = require("../app/controllers/SessionController")

const UserValidator = require("../app/validators/user")

const SessionValidator = require("../app/validators/session")


const {onlyUsers, UserIsAdmin, userIsLogged} = require("../app/middlewares/session")

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
routes.get('/', onlyUsers , UserController.index)

// ROTAS PARA CRIAR USUÁRIOS - SOMENTE ADMIN PODE
routes.get('/create', onlyUsers, UserIsAdmin, UserController.create)
routes.post('/create', onlyUsers, UserIsAdmin, UserValidator.post, UserController.post)

// ROTAS PARA O ADMIN ATUALIZAR OUTROS USUÁRIOS
routes.get('/:id/edit', onlyUsers, UserIsAdmin, UserValidator.edit, UserController.edit)
routes.put('/', onlyUsers, UserIsAdmin, UserValidator.update, UserController.update)

// ROTA PARA DELETAR USUÁRIOS
routes.delete('/', onlyUsers, UserIsAdmin, UserController.delete)


module.exports = routes