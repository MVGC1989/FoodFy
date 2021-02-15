const express = require("express")
const routes = express.Router()
const multer = require("../app/middlewares/multer")
const  {UserIsAdmin}= require("../app/middlewares/session")

const RecipesController = require("../app/controllers/RecipesController")


// ROTAS ADMIN RECIPES

routes.get("/",RecipesController.index)
routes.get("/my-recipes", RecipesController.myRecipes)
routes.get("/create", RecipesController.create)
routes.post("/", multer.array("photos", 5), RecipesController.post)
routes.get("/:id", RecipesController.show)
routes.get("/:id/edit", RecipesController.edit)
routes.put("/", multer.array("photos", 5), RecipesController.put)
routes.delete("/", RecipesController.delete)

module.exports = routes