const express = require("express")
const routes = express.Router()

const UserController = require("../app/controllers/UserController")
const SessionController = require("../app/controllers/SessionController")

const UserValidator = require("../app/validators/user")
const SessionValidator = require("../app/validators/session")


const { onlyUsers, userIsLogged} = require("../app/middlewares/session")

//LOGIN-LOGOUT 
routes.get('/login', userIsLogged, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', onlyUsers ,SessionController.logout)

//RECUPERAR SENHA
routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot) 
routes.get('/password-reset', SessionController.resetForm) 
routes.post('/password-reset', SessionValidator.reset, SessionController.reset) 


//ROTAS DE USUÁRIOS

routes.get('/', onlyUsers , UserController.index)

routes.get('/create', onlyUsers,  UserController.create)
routes.post('/create', onlyUsers, UserValidator.post, UserController.post)

routes.get('/:id/edit', onlyUsers, UserValidator.edit, UserController.edit)
routes.put('/', onlyUsers, UserValidator.update, UserController.update)

routes.delete('/', onlyUsers, UserController.delete)

module.exports = routes