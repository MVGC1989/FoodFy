const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')
const { emailTemplate , getParams} = require('../../lib/utils');

const Recipe = require("../models/Recipe")
const User = require('../models/User')
const File = require("../models/Files")

module.exports = {
    async index(req, res) {
        try {
            const error = req.session.error
            req.session.error = ""

            const success = req.session.success
            req.session.success = ''

            let {page, limit} = req.query

            page = page || 1
            limit = limit || 6
            let offset = limit * (page - 1)

            const params = {
                page,
                limit,
                offset
            }

            let results = await User.paginate(params)
            const users = results.rows

            const pagination = {
                total: Math.ceil(users[0].total/limit),
                    page
            }
            /*const params = getParams(req.query, 6)
            const users = await User.paginate(params)
            const pagination = { page: params.page }
    
            users.length == 0
            ? pagination.total = 1
            : pagination.total = Math.ceil(users[0].total / params.limit)*/

            return res.render("admin/users/index", {users, pagination, error, success})
        } catch (error) {
            console.error(error)
        }
    },

    create(req, res) {
        try {
            const success = req.session.success
            req.session.success = ''

            return res.render("admin/users/create", {success})
        } catch (error) {
            console.error(error)
        }
    },

    async post(req, res) {
        try {
            let { name, email, is_admin } = req.body

            is_admin = is_admin || false

            const userPassword = crypto.randomBytes(3).toString('hex')
            const welcomeEmail = `
                <h2 style="font-size: 24px; font-weight: normal;">Olá <strong>${name}</strong>,</h2>
                <p>Seja muito bem-vindo(a) ao <strong>Foodfy</strong> :)</p>
                <p>Seu cadastro foi realizado com sucesso em nossa plataforma! Confira seus dados de acesso:</p>
                <p>Login: ${email}</p>
                <p>Senha: ${userPassword}</p>
                <br>
                <h3>Para acessar sua conta:</h3>
                <p>
                    Clique no botão abaixo e digite seu email e senha informados acima.
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
            req.session.success = "Usuário criado com sucesso!"

            return res.redirect(`/admin/users/${userId}/edit`)
        } catch (err) {
            console.error(err)
        }
},

    async edit(req, res) {
        try {
            const { user }= req

            const error = req.session.error
            req.session.error = ""

            const success = req.session.success
            req.session.success = ""
            
            return res.render('admin/users/edit', {user, error, success})

        } catch (err) {
            console.error(err)
        }
    },

    async update(req, res) {
        try {
            const {user} = req

            let { name, email, is_admin } = req.body
            is_admin = is_admin || false

            await User.update(user.id, {
                name,
                email,
                is_admin
            })
            req.session.success = "Usuário atualizado!"
            return res.redirect(`/admin/users/${req.user.id}/edit`)
        } catch (err) {
            console.error(err)
            return res.render('admin/users/edit', {
                user: req.body,
                error: 'Erro inesperado !'
            })
        }
    },

    async delete(req, res) {
        try {
            if(req.body.id==req.session.userId){
                
                req.session.error = `Você não pode deletar sua própria conta.`
                return res.redirect(`/admin/users/${req.body.id}/edit`)
            }
            await User.delete(req.body.id)

            req.session.success = "Conta deletada com sucesso !"
            return res.redirect("/admin/users")

        } catch (error) {
            console.error(error)
            req.session.error = "Erro ao deletar conta !"
            return res.redirect(`/admin/users/${req.body.id}/edit`)
        }
    }
}

