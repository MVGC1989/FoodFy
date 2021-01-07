const express = require("express")
const routes = express.Router()
const multer = require("./app/middlewares/multer")

const homepage = require("./app/controllers/home_foodfy")
const recipes = require("./app/controllers/recipes")
const chefs = require("./app/controllers/chefs")

// ROTAS WEBSITE

routes.get("/", homepage.index)
routes.get("/about", homepage.about)
routes.get("/recipes", homepage.index_recipes) 
routes.get("/chefs", homepage.index_chefs)
routes.get("/show_chef/:id", homepage.show_chef)
routes.get("/recipe/:id", homepage.show_recipe) 
routes.get("/search", homepage.search)

// ROTAS ADMIN RECIPES

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.post("/admin/recipes", multer.array("photos", 5), recipes.post)
routes.put("/admin/recipes", multer.array("photos", 5), recipes.put)
routes.delete("/admin/recipes", recipes.delete)

//ROTAS ADMIN CHEFS

routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)
routes.post("/admin/chefs", multer.array("avatar",1), chefs.post)
routes.put("/admin/chefs", multer.single("avatar"), chefs.put)
routes.delete("/admin/chefs", chefs.delete)

module.exports = routes