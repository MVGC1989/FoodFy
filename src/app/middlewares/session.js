function onlyUsers(req, res, next){
    if(!req.session.userId){
        return res.redirect("/admin/users/login")
    }

    next()
}

function userIsLogged(req, res, next){
    
    if(req.session.userId){
        return res.redirect("/admin/profile")
    }
    next()
}

module.exports = {
    onlyUsers,
    userIsLogged,
}