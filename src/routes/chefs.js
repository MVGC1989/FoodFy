const express = require("express")
const routes = express.Router()
const multer = require("../app/middlewares/multer")

const  {onlyUsers}= require("../app/middlewares/session")
const ChefsController = require("../app/controllers/ChefsController")
const ChefsValidator = require("../app/validators/chefs")


//ROTAS ADMIN CHEFS

routes.get("/", onlyUsers, ChefsController.index)

routes.get("/create", onlyUsers, ChefsController.create)
routes.post("/", onlyUsers, multer.array("photos",1),  ChefsValidator.post, ChefsController.post)
routes.get("/:id", onlyUsers, ChefsController.show)

routes.get("/:id/edit", onlyUsers, ChefsController.edit)
routes.put("/", onlyUsers, multer.single("photos"),  ChefsValidator.update, ChefsController.update)
routes.delete("/", onlyUsers, ChefsController.delete)

module.exports = routes