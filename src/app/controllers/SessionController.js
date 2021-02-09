const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const {hash} = require('bcryptjs')
const User = require('../models/User')
const {emailTemplate} = require('../../lib/utils')


module.exports ={
    loginForm(req , res){
        return res.render("admin/session/login")
    },
    
    login(req , res){
        req.session.userId = req.user.id 
        req.session.isAdmin = req.user.is_admin
        return res.redirect("/admin/profile")
    },

    logout(req , res){
        req.session.destroy()
        return res.redirect("/")
    },

    forgotForm(req , res){
        return res.render("admin/session/forgot-password")
    },

    async forgot(req , res){
        try{
            const {user} = req

             //Criar Token
            const token = crypto.randomBytes(20).toString("hex")

            //Criar uma expiração do token
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            //Enviar email com link de recuperação de senha
            
            const email = `
            <h2 style="font-size: 24px; font-weight: normal;">Esqueceu sua senha ? </h2>
            <br>
            <p>
                Esqueceu ou quer trocar sua senha? Não se preocupe ${user.name} !
                <br><br>
                Clique e botão abaixo para recupera-lá ou atualiza-lá:
            </p>
            <p style="text-align: center;">
                <a
                    style="display: block; margin: 32px auto; padding: 16px; width:150px; color: #fff;
                    background-color: #6558C3; text-decoration: none; border-radius: 4px;"
                    href="http:localhost:3000/admin/users/password-reset?token=${token}" target="_blank"
                >Recuperar</a> 
            </p>
            <p style="padding-top:16px; border-top: 2px solid #ccc">Te esperamos lá!</p>
            <p>Equipe Foodfy.</p>
            `;
            await mailer.sendMail({
                to: user.email,
                from: "no-reply@foodfy.com.br",
                subject: "Recuperação de Senha",
                html: emailTemplate(email) 
            })

            //Avisar usuário do email enviado
            return res.render("admin/session/forgot-password", {
                success: "Verifique seu e-mail para recuperar sua senha !"
            })

        }catch(error){
            console.error(error)
            return res.render("admin/session/forgot-password", {
                error: "Erro inesperado. Tente novamente !"
            })
        }
    },

    resetForm(req, res){
        return res.render("admin/session/password-reset", {token: req.query.token})
    },

    async reset(req, res){
        const user = req.user
        const {password , token} = req.body

        try{
            //Criar novo hash de senha
            const newPassword = await hash(password, 8)
            
            //Atualiza o usuário
            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            //Avisa o usuário que ele tem uma nova senha
            return res.render("admin/session/login", {
                user:req.body,
                success: "Senha atualizada com sucesso!"
            })

        }catch(error){
            console.error(error)
            return res.render("admin/session/password-reset", {
                user: req.body,
                token,
                error: "Erro inesperado. Tente novamente !"
            })
        }
    }
}