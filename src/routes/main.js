const express = require('express')
const routes = express.Router()

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