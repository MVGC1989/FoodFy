const express = require('express')
const routes = express.Router()

const {onlyUsers, UserIsAdmin} = require("../app/middlewares/session")

const UserController = require("../app/controllers/UserController")
const ProfileController = require("../app/controllers/ProfileController")

const UserValidator = require("../app/validators/user")

//ROTAS QUE TODOS OS USUÁRIOS PODEM ACESSAR
routes.get('/index', ProfileController.index)
routes.put('/', UserValidator.update, ProfileController.update)



module.exports = routes