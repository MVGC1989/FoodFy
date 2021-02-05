//ROTAS QUE TODOS OS USUÁRIOS PODEM ACESSAR - SEU PERFIL

const express = require("express")
const routes = express.Router()

const ProfileController = require("../app/controllers/ProfileController")
const ProfileValidator = require("../app/validators/profile")

routes.get('/', ProfileController.show)
routes.put('/', ProfileValidator.update, ProfileController.update)

module.exports = routes