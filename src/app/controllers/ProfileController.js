const User = require("../models/User")

module.exports = {
    index(req, res) {
        //const { user, session: { success, error } } = req

        //req.session.success = "", req.session.error = ""

        return res.render("admin/session/profile"
         /*{ user, success, error }*/)
    },

    async update(req, res) {
        try {
            let { name, email } = req.body
            const { user } = req

        await User.update(user.id, {
        name,
        email
        })

        req.session.success = "Usuário atualizado com sucesso!"

        return res.redirect(`/admin/profile`)
    } 
    catch (err) {
        console.error(err)
        req.session.error = "Ocorreu um erro inesperado!"
        return res.redirect(`/admin/profile`) 
    }
    }
}