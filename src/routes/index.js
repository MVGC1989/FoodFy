const express = require('express')
const routes = express.Router()

const { onlyUsers, isLoggedRedirectToProfile } = require('../app/middlewares/session');

const main = require("./main")
const chefs = require("./chefs")
const recipes = require("./recipes")
const users = require("./users")


routes.use(main)
routes.use("/admin/chefs", chefs)
routes.use("/admin/recipes", recipes)
routes.use("/admin/users", users)


//ATALHOS
routes.get('/accounts', function(req , res){
    return res.redirect("/admin/users/login")
})


module.exports = routes