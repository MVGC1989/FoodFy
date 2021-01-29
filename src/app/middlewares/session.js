const User = require("../models/User")

function onlyUsers(req, res, next){
    if(!req.session.userId){
        return res.redirect("/admin/session/login")
    }

    next()
}

function userIsLogged(req, res, next){
    
    if(req.session.userId){
        return res.redirect("admin/profile/index")
    }
    next()
}

async function UserIsAdmin (req, res, next) {
    const {userId : id} = req.session

    const user = await User.findOne({where: {id}})

    if(!user.is_admin == true) {
        return res.render("admin/users/error", {
            error:" Esta área é restrita aos administradores !"
        })
    }

    next()
}

module.exports = {
    onlyUsers,
    userIsLogged,
    UserIsAdmin
}