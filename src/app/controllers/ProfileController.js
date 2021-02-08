const User = require("../models/User")

module.exports = {
    index(req, res) {
        const { user } = req;
        const { error } = req.session;

        if (error) {
            res.render('admin/users/index', { user, error });
            req.session.error = '';
            return;
        }
        
        return res.render('admin/users/index', { user });
    },
    /*async index(req, res) {
        try {          
            const { userId : id } = req.session

            const user = await User.findOne({where: {id}})

            return res.render("admin/profile/index", {user})            
        } catch (error) {
            console.error(error)
        }
    },*/

    async show(req, res){
        const {user} = req

        return res.render("admin/profile/index", {user})
    },

    async update(req, res) {
        const { user } = req
        const { name , email} = req.body
        
        try {
            await User.update(user.id, {
            name,
            email
        })
        req.session.success = "Perfil atualizado com sucesso!"

        return res.redirect(`/admin/users/index`)
    } 
    catch (err) {
        console.error(err)
        req.session.error = "Ocorreu um erro inesperado!"
        return res.redirect("admin/users/index") 
    }
    }
}