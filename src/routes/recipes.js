const express = require("express")
const routes = express.Router()
const multer = require("../app/middlewares/multer")
const  {onlyUsers}= require("../app/middlewares/session")

const RecipesController = require("../app/controllers/RecipesController")
const RecipeValidator = require("../app/validators/recipes")


// ROTAS ADMIN RECIPES

routes.get("/", onlyUsers,RecipesController.index)
routes.get("/my-recipes", onlyUsers, RecipesController.myRecipes)

routes.get("/create", onlyUsers, RecipesController.create)
routes.post("/", onlyUsers, multer.array("photos", 5), RecipeValidator.post, RecipesController.post)
routes.get("/:id", onlyUsers, RecipesController.show)

routes.get("/:id/edit", onlyUsers, RecipesController.edit)
routes.put("/", multer.array("photos", 5), RecipeValidator.update, RecipesController.update)
routes.delete("/", onlyUsers, RecipesController.delete)

module.exports = routes