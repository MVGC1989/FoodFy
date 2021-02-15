const User = require("../models/User")
const {compare} = require('bcryptjs')

async function login (req, res, next){    
    try {
        const { email, password } = req.body

        if (!email || !password) return res.render('admin/session/login', {
            user: req.body,
            error: 'Por favor, entre com seu email e senha.',
        })

        const user = await User.findOne({ where: { email } })

        if (!user) return res.render('admin/session/login', {
            user: req.body,
            error: 'Usuário não cadastrado!' 
        })

        const passed = await compare(password, user.password)

        if (!passed) return res.render('admin/session/login', {
            user: req.body,
            error: 'Senha incorreta! Tente novamente.'
        })

        req.user = user

        next()
    } catch (error) {
        console.error(error)
    }
}

async function forgot (req, res, next){
    try{
        const {email} = req.body
        let user =await User.findOne({ where: {email}})

        if(!user) return res.render("admin/session/forgot-password", {
            user: req.body,
            error: "E-mail não cadastrado !"
        })

        req.user = user

        next()

    }catch(error){
        console.error(error)
    }
}

async function reset(req, res, next){
    try{
        const {email , password, token, passwordRepeat} = req.body
        
        //Procurar o usuário
        const user = await User.findOne({where: {email}})

        if(!user) return res.render("admin/session/password-reset", {
        user: req.body,
        token,
        error: "Usuário não cadastrado !"
        })

        //Checar se a senha corresponde
        if(password != passwordRepeat){
            return res.render("admin/session/password-reset", {
                user: req.body,
                token,
                error: "As senhas digitadas são diferentes !"
            })
        }

        //Verificar se token corresponde
        if(token != user.reset_token){
            return res.render("admin/session/password-reset", {
                user: req.body,
                token,
                error: "Token inválido ! Solicite uma nova recuperação de senha."
            })
        }
        
        //Verificar se token expirou
        let now = new Date()
        now.setHours(now.getHours())

        if(now > user.reset_token_expires)
            return res.render("admin/session/password-reset", {
                user: req.body,
                token,
                error: "Token expirado! Por favor solicite uma nova recuperação de senha."
            })
        req.user = user
        next()

    }catch (error) {
        console.error(error)
    }
}

module.exports={
    login,
    forgot,
    reset
}
