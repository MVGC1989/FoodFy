const express = require("express")
const routes = express.Router()
const multer = require("../app/middlewares/multer")

const  {onlyUsers}= require("../app/middlewares/session")
const chefs = require("../app/controllers/ChefsController")


//ROTAS ADMIN CHEFS

routes.get("/", onlyUsers, chefs.index)
routes.get("/create", onlyUsers, chefs.create)
routes.get("/:id", onlyUsers, chefs.show)
routes.get("/:id/edit", onlyUsers, chefs.edit)
routes.post("/", onlyUsers, multer.array("avatar",1), chefs.post)
routes.put("/", onlyUsers, multer.single("avatar"), chefs.update)
routes.delete("/", onlyUsers, chefs.delete)

module.exports = routes