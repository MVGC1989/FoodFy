const express = require('express')
const routes = express.Router()

const ProfileController = require("../app/controllers/ProfileController")

routes.get('/index', ProfileController.index)
//routes.put('/', onlyUsers, UserValidator.passwordMatch, ProfileController.update)

module.exports = routes