const express = require('express')
const routes = express.Router()

const chefs = require("./chefs")
const recipes = require("./recipes")
const users = require("./users")
const session = require("./session")
const profile = require("./profile")

routes.use("/admin/chefs", chefs)
routes.use("/admin/recipes", recipes)
routes.use("/admin/users", users)
routes.use("/admin/session", session)
routes.use("/admin/profile", profile)


//ATALHOS
routes.get('/accounts', function(req , res){
    return res.redirect("/admin/session/login")
})

// ROTAS PÁGINA INICIAL
const HomeController = require("../app/controllers/HomeController")

routes.get("/", HomeController.index)
routes.get("/about", HomeController.about)
routes.get("/recipes", HomeController.index_recipes) 
routes.get("/chefs", HomeController.index_chefs)
routes.get("/show_chef/:id", HomeController.show_chef)
routes.get("/recipe/:id", HomeController.show_recipe) 
routes.get("/search", HomeController.search)

module.exports = routes