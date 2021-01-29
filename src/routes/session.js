const express = require("express")
const routes = express.Router()
const {onlyUsers, userIsLogged} = require("../app/middlewares/session")

const SessionValidator = require("../app/validators/session")
const SessionController = require("../app/controllers/SessionController")


//LOGIN-LOGOUT USUÁRIO

routes.get('/login', userIsLogged, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', onlyUsers, SessionController.logout)

routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm) 
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot) 
routes.post('/password-reset', SessionValidator.reset, SessionController.reset) 

module.exports = routes