//ROTAS QUE TODOS OS USUÁRIOS PODEM ACESSAR - SEU PERFIL

const express = require("express")
const routes = express.Router()

const ProfileController = require("../app/controllers/ProfileController")
const ProfileValidator = require("../app/validators/profile")
const  {onlyUsers}= require("../app/middlewares/session")

routes.get('/', onlyUsers, ProfileValidator.show, ProfileController.show)
routes.put('/', onlyUsers, ProfileValidator.update, ProfileController.update)

module.exports = routes