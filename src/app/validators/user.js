const User = require("../models/User")
const {compare} = require('bcryptjs')

function checkAllFields(body){
    const keys = Object.keys(body) 
        for( key of keys){
            if(body[key]== ""){
                return {
                    user: body,
                    error: "Por favor, preencha todos os campos !"
                }
            }
        }
}

async function show (req, res, next){
    const {userId : id} = req.session

    const user = await User.findOne({where: {id}})

    if(!user) return res.render("user/register", {
        error: "Usuário não encontrado !"
    })

    req.user = user

    next()
}

async function post (req , res , next){
     //checar se todos os campos estão preenchidos

    const fillAllFields = checkAllFields(req.body)

    if(fillAllFields){
        return res,render("admin/user/register", fillAllFields)
    }
    
    //Ver se usuário já existe
    let { email} = req.body

        const user = await User.findOne({where: {email}})

        if(user){ return res.render("admin/user/register", {
            user: req.body,
            error: "Usuário já cadastrado !"
        })}

        next()
}

async function updateProfile(req, res, next){
    //checando campos
    const fillAllFields = checkAllFields(req.body)

    if(fillAllFields){
        return res,render("admin/user/profile", fillAllFields)
    }

    //checando se a senha foi preenchida

    const {id , password} = req.body

    if(!password) return res.render("admin/user/profile", {
        user: req.body,
        erro: "É necessário digitar sua senha para atualizar o cadastro !"
    })

    //ver se a senha esta certa

    const user = await User.findOne({ where: {id}})

    const passed = await compare(password , user.password)

    if(!passed) return res.render("admin/user/profile", {
        user: req.body,
        erro: "Senha incorreta !"
    })

    req.user = user

    next()
}

async function adminDeletesOwnAccount(req, res, next) {
    const { userId } = req.session
    const { id } = req.body

    const user = await User.findOne({ where: { id } })

    if(userId == id) {
        return res.render("admin/users/profile", {
        user,
        error: "Desculpe, você não pode deletar a própria conta !"
        })
    }

    next()
}

module.exports = {
    post,
    show,
    updateProfile,
    adminDeletesOwnAccount
}