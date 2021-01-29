const express = require("express")
const routes = express.Router()
const {onlyUsers, UserIsAdmin} = require("../app/middlewares/session")

const FieldsValidator= require("../app/validators/chekfields")
const UserValidator = require("../app/validators/user")

const UserController = require("../app/controllers/UserController")


//CADASTRO DE USUÁRIOS

// Admin
routes.get("/", /*onlyUsers*/ UserController.index)
routes.get("/create", /*userIsAdmin*/ UserController.create)
//routes.get("/:id/edit", onlyUsers, userIsAdmin, UserController.edit)
routes.post("/" , /* onlyUsers, userIsAdmin,*/ FieldsValidator.checkAllFields, UserValidator.emailCheck, UserController.createNewUser)
//routes.put("/", userIsAdmin, UserValidator.update, FieldsValidator.checkAllFields, UserController.update)
//routes.delete("/", userIsAdmin, UserValidator.adminDeletesOwnAccount, UserController.delete)


module.exports = routes