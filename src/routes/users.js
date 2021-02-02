const express = require("express")
const routes = express.Router()

const UserController = require("../app/controllers/UserController")
const ProfileController = require("../app/controllers/ProfileController")
const SessionController = require("../app/controllers/SessionController")

const UserValidator = require("../app/validators/user")
const ProfileValidator = require("../app/validators/profile")
const SessionValidator = require("../app/validators/session")


const {onlyUsers, UserIsAdmin, userIsLogged} = require("../app/middlewares/session")

//LOGIN-LOGOUT 
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

//RECUPERAR SENHA
routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot) 
routes.get('/password-reset', SessionController.resetForm) 
routes.post('/password-reset', SessionValidator.reset, SessionController.reset) 


//CADASTRO DE USUÁRIOS

//ROTAS QUE TODOS OS USUÁRIOS PODEM ACESSAR - SEU PERFIL
routes.get('/profile', ProfileController.index)
routes.put('/profile', ProfileValidator.update, ProfileController.update)

//ROTA PARA ADMIN VER A LISTA DE USUÁRIOS
routes.get('/', UserController.index)

// ROTAS PARA CRIAR USUÁRIOS - SOMENTE ADMIN PODE
routes.get('/create', UserController.create)
routes.post('/create', UserValidator.post, UserController.post)

// ROTAS PARA O ADMIN ATUALIZAR OUTROS USUÁRIOS
routes.get('/:id/edit',UserValidator.edit, UserController.edit)
routes.put('/', UserValidator.update, UserController.update)

// ROTA PARA DELETAR USUÁRIOS
routes.delete('/', UserValidator.remove, UserController.delete)


module.exports = routes