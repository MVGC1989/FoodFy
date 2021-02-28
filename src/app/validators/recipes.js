const Recipe = require('../models/Recipe')

async function post(req, res, next) {
    try {

        const results = await Recipe.chef_selection()
        const chef_selection = results.rows

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.render("admin/recipes/create", {
                    recipes:req.body,
                    chef_selection,
                    error: "Por favor preencha todos os campos!"
                })
            }    
        }

        if (!req.files || req.files.length == 0){
            return res.render("admin/recipes/create", {
                recipes:req.body,
                chef_selection,
                error: "Envie pelo menos uma imagem!"
            })
        }

        next()

    } catch (error) {
        console.error(error);
    }
}

async function update(req, res, next) {
    try {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send("Por favor, preencha todos os campos!")
            }    
        }

        next()

    } catch (error) {
        console.error();
    }
}


module.exports = {
    post,
    update
}