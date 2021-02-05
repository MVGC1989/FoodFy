const express = require("express")
const routes = express.Router()
const multer = require("../app/middlewares/multer")


const chefs = require("../app/controllers/ChefsController")


//ROTAS ADMIN CHEFS

routes.get("/", chefs.index)
routes.get("/create", chefs.create)
routes.get("/:id", chefs.show)
routes.get("/:id/edit", chefs.edit)
routes.post("/", multer.array("avatar",1), chefs.post)
routes.put("/", multer.single("avatar"), chefs.update)
routes.delete("/", chefs.delete)

module.exports = routes