function onlyUsers(req, res, next){
    if(!req.session.userId){
        return res.redirect("/admin/users/login")
    }

    next()
}

function userIsLogged(req, res, next){
    if(req.session.userId){
        return res.redirect("/admin/users")
    }
    next()
}

function userIsAdmin(request, response, next) {
    if (!request.session.isAdmin) return response.redirect("/admin/users/profile")

    next()
}

module.exports = {
    onlyUsers,
    userIsLogged,
    userIsAdmin
}