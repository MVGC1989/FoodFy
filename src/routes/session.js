const express = require("express")
const routes = express.Router()
const {onlyUsers, userIsLogged, userIsAdmin} = require("../app/middlewares/session")

const UserValidator = require("../app/validators/user")
const SessionValidator = require("../app/validators/session")

const UserController = require("../app/controllers/UserController")
const SessionController = require("../app/controllers/SessionController")
const ProfileController = require("../app/controllers/ProfileController")



//LOGIN-LOGOUT USUÁRIO

routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

module.exports = routes