const User = require('../models/User')
const {compare} = require('bcryptjs')
const Recipe = require("../models/Recipe")

function checkAllFields(body) {
    const keys = Object.keys(body);

    for (let key of keys) {
        if (body[key] == '') {
            return {
                user: body,
                error: 'Por favor, preencha todos os campos!'
            };
        }
    }
}

async function show(req, res, next) {
    const { userId: id } = req.session
    const user = await User.findOne({ where: { id } })

    if (!user) return res.render('admin/users/create', {
        error: 'Usuário não encontrado!'
    });

    req.user = user

    next()
}

async function post(req, res, next) {
    try{
        const fillAllFields = checkAllFields(req.body)
        if(fillAllFields) return res.render('admin/users/create', fillAllFields)
        
        const { email } = req.body
        const user = await User.findOne({where: { email }})
        if (user) return res.render('admin/users/create', {
            user: req.body,
            error: 'Usuário já cadastrado. Tente outro email.'
        })
        
        next()
    }catch (error) {
        console.error(error)
    }
}

async function edit(req, res, next) {
    try{
        const { id } = req.params
        const user = await User.findOne({ where: { id } })

        if (!user) return res.render('admin/users/create', {
            error: 'Usuário não encontrado!'
        });
        req.user = user
        
        next();
    }catch (error) {
        console.error(error)
    }
}

async function update(req, res, next) {
    const fillAllFields = checkAllFields(req.body)
        if(fillAllFields) return res.render('admin/users/edit', fillAllFields)
    
    const {id , password} = req.body
    const user = await User.findOne({where: { id } })

    if (req.session.userId == id) {
        if(!password){
            return res.render('admin/users/index', {
                user: req.body,
                error: 'Digite sua senha para atualizar seu cadastro!.'
        })
        }
    }

    const passed = await compare(password, user.password)
        if(!passed) return res.render('admin/user/index', {
            user: req.body,
            error: 'Senha incorreta.'
        })

    req.user = user

    next()
}


async function remove(req, res, next) {
    const { userId: id } = req.session
    const deletedUserId = req.body.id

    const user = await User.find(req.body.id)
    const users = await User.findAll() 

    if(id == deletedUserId) {
        return res.render('admin/user/index', {
            user,
            users,
            error: 'Não é possível deletar a própria conta.'
        })
    } else {
        next()
    }
}


module.exports = { show, post, edit, update, remove }