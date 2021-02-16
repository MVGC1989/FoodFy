const User = require("../models/User")

module.exports = {
    show(req, res) {
        try {          
            const { user } = req

            const error = req.session.error
            req.session.error = ""

            const success = req.session.success
            req.session.success = ""

            return res.render("admin/profile/index", {user, error, success})            
        } catch (error) {
            console.error(error)
        }
    },

    async update(req, res) {
        try {
            const { user } = req
            let { name, email } = req.body

            await User.update(user.id, {
                name,
                email
        })

        req.session.success = "Perfil atualizado com sucesso!"
        return res.redirect("/admin/profile")
    } 
    catch (err) {
        console.error(err)
        req.session.error = "Ocorreu um erro inesperado!"
        return res.redirect("/admin/profile") 
    }
    }
}