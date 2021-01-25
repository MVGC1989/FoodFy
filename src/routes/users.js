const express = require("express")
const routes = express.Router()
const {onlyUsers, userIsLogged, userIsAdmin} = require("../app/middlewares/session")

const UserValidator = require("../app/validators/user")
const SessionValidator = require("../app/validators/session")

const UserController = require("../app/controllers/UserController")
const SessionController = require("../app/controllers/SessionController")
const ProfileController = require("../app/controllers/ProfileController")

//CADASTRO DE USUÁRIOS

// Admin
routes.get("/", /*onlyUsers*/ UserController.index)
routes.get("/register", /*userIsAdmin*/ UserController.registerForm)
//routes.get("/:id/edit", userIsAdmin, UserValidator.edit, UserController.edit)
routes.post("/" , /*userIsAdmin,*/ UserValidator.post, UserController.post)
//routes.put("/", userIsAdmin, UserValidator.update, UserController.update)
//routes.delete("/", userIsAdmin, UserValidator.adminDeletesOwnAccount, UserController.delete)


module.exports = routes