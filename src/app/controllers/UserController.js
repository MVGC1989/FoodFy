const User = require('../models/User')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')
const { emailTemplate} = require('../../lib/utils');

module.exports = {
    async index(req, res) {
        try {
        
            const users = await User.findAll()

            return res.render("admin/users/index", {users})
        } catch (error) {
            console.error(error)
        }
    },

    create(req, res) {
        return res.render("admin/users/create")
    },

    async post(req, res) {
        try {
            let { name, email, is_admin } = req.body

            

            is_admin = is_admin || false

            const userPassword = crypto.randomBytes(3).toString('hex')
            const welcomeEmail = `
                <h2 style="font-size: 24px; font-weight: normal;">Olá <strong>${name}</strong>,</h2>
                <p>Seja muito bem-vindo(a) ao <strong>Foodfy</strong> :)</p>
                <p>Seu cadastro foi realizado com sucesso! Confira seus dados de acesso:</p>
                <p>Login: ${email}</p>
                <p>Senha: ${userPassword}</p>
                <br>
                <h3>Como eu acesso minha Conta?</h3>
                <p>
                    Bem simples, você só precisa clicar no botão abaixo e entrar com seu email e senha informados acima.
				</p>
				<p style="text-align: center;">
                    <a
                        style="display: block; margin: 32px auto; padding: 16px; width:150px; color: #fff;
                        background-color: #6558C3; text-decoration: none; border-radius: 4px;"
                        href="http:localhost:3000/admin/users/login" target="_blank"
                    >Acessar</a> 
				</p>
                <p style="padding-top:16px; border-top: 2px solid #ccc">Te esperamos lá!</p>
                <p>Equipe Foodfy.</p>
            `

            await mailer.sendMail({
                to: req.body.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Bem-vindo ao Foodfy',
                html: emailTemplate(welcomeEmail)
            })

            const password = await hash(userPassword, 8)

            const userId = await User.create({
                name,
                email,
                password,
                is_admin
            })
            
            req.session.success = 'Usuário cadastrado com sucesso!'

            return res.redirect(`/admin/users/${userId}/edit`)
        } catch (err) {
            console.error(err)
        }
},

    async edit(req, res) {
        try {
            const { user }= req
            
            return res.render('admin/users/edit', {user})

        } catch (err) {
            console.error(err)
        }
    },

    async update(req, res) {
        try {
            let { id, name, email, is_admin } = req.body
            is_admin = is_admin || false

            await User.update(id, {
                name,
                email,
                is_admin
            })

            return res.render('admin/users/edit', {
                user: req.body,
                success: 'Usuário atualizado com sucesso!'
            })
        } catch (err) {
            console.error(err)
            return res.render('admin/users/edit', {
                user: req.body,
                error: 'Ops, algum erro aconteceu!'
            })
        }
    },

    async delete(req, res) {
        const {id} = req.body
        try {
            await User.delete(id)
            req.session.destroy()

            return res.render("admin/session/login", {
                success: "Conta deletada com sucesso !"
            })

        } catch (error) {
            console.error(error)
            return res.render("admin/users/index", {
                user:req.body,
                error: "Erro ao deletar conta !"
            })
        }
    }
}

