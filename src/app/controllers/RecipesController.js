
const Recipe = require("../models/Recipe")
const File = require("../models/Files")
const {date} = require("../../lib/utils")


module.exports = {
    async index(req, res) {
        try {
            const error = req.session.error
            req.session.error = ""

            const success = req.session.success
            req.session.success = ""

            let {page, limit} = req.query 
        
            page = page || 1 
            limit = limit || 6 
            let offset = limit * (page -1)
        
            const params = {
                page,
                limit,
                offset,
        }
        
        let results = await Recipe.paginate(params)
        const recipes = results.rows

        const pagination ={
            total: Math.ceil(recipes[0].total/limit),
            page
        }

        async function getImage(recipeId) {
            let results = await Recipe.files(recipeId)
            const file = results.rows[0]
    
            return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }
    
        const recipesPromise = recipes.map(async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        })
    
        const allRecipes = await Promise.all(recipesPromise)

        const idUser = req.session.userId

            return res.render('admin/recipes/index', { recipes: allRecipes , pagination, idUser, error, success})
        } 
        catch (err) {
            console.error(err)
        }
    },

    async myRecipes(req, res) {
        try {  
            let {page, limit, user, user_is_admin} = req.query 
                
            page = page || 1 
            limit = limit || 6 
            let offset = limit * (page -1)
                
            user = req.session.userId
            user_is_admin = req.session.isAdmin
                
            const params = {
                page,
                limit,
                offset,
                user,
                user_is_admin
            }

            let results = await Recipe.paginate(params)

            if(results.rows.length == 0){
                    return res.render("admin/recipes/index")
            } else{
                    const recipes = results.rows
                    
                    const pagination ={
                        total: Math.ceil(recipes[0].total/limit),
                        page
                    }
                    
                    async function getImage(recipeId) {
                        let results = await Recipe.files(recipeId)
                        const file = results.rows[0]
                        
                        return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                    }
                    
                    const recipesPromise = recipes.map(async recipe => {
                        recipe.image = await getImage(recipe.id)
                        return recipe
                    })
                    
                    const allRecipes = await Promise.all(recipesPromise)
                    
                    const idUser = req.session.userId
                    
                    return res.render('admin/recipes/index', { recipes: allRecipes , pagination, idUser})
            }
        }catch (err) {
            console.error(err)
        }
    },

    async create(req, res) {
        //Pega Chefs
        try {
            const results = await Recipe.chef_selection()
            const chef_selection = results.rows
            return res.render("admin/recipes/create", { chef_selection })
        }catch (err) {
            console.error (err)
        }

    },
    async post(req, res){
        try{
            
        
        req.body.user_id = req.session.userId
        req.body.is_admin = req.session.isAdmin

        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map( file => File.createRecipeFile({
            ...file,
            recipe_id: recipeId
        }))

        await Promise.all(filesPromise)
        req.session.success = "Receita criada com sucesso!"
        return res.redirect(`/admin/recipes/${recipeId}`)
        }
        catch (err) {
            console.error (err)
        }
        
    },

    async show(req, res) {
        try {
            const success = req.session.success
            req.session.success = ""

            let results = await Recipe.find(req.params.id)
            const recipe = results.rows[0]
            
            if(!recipe) {
                return res.send("Receita não encontrada!")
            } 
            
            recipe.created_at = date(recipe.created_at).format
            recipe.updated_at = date(recipe.updated_at).format

            results = await Recipe.files(recipe.id)
            const files = results.rows.map( file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            return res.render("admin/recipes/show", { recipe, files, success })
        
        }catch (err) {
            console.error (err)
        }
        
    },

    async edit(req, res){
        try{
            const success = req.session.success
            req.session.success = ""

            const error = req.session.error
            req.session.error = ""

            let results = await Recipe.find(req.params.id)
            const recipes = results.rows[0]

            if(!recipes) return res.send("Recipe not found!")
            
            //pega chefs
            results = await Recipe.chef_selection()
            const chef_selection = results.rows

            //pega images
            results = await Recipe.files(recipes.id)
            let files = results.rows

            files = files.map( file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            return res.render('admin/recipes/edit', { recipes, chef_selection, files, success, error})
            
        }catch (err) {
            console.error(err)
        } 
    },

    async update(req, res){
        try{
    
            if(req.body.removed_files){//removendo foto
                const removedFiles = req.body.removed_files.split(",")
                const last_index = removedFiles.length -1
                removedFiles.splice(last_index, 1)
            
                const removedFilesPromise = removedFiles.map(id => {
                    File.delete(id)
                })
                await Promise.all(removedFilesPromise)
        }

            if (req.files.length != 0) {
                const oldFiles = await Recipe.files(req.body.id)
                const totalFiles = oldFiles.rows.length + req.files.length

            if(totalFiles <= 5){
                const newFilesPromise = req.files.map( file => File.createRecipeFile({
                    ...file, 
                    recipe_id: req.body.id
                }))
                await Promise.all(newFilesPromise)
            }
            }
            await Recipe.update(req.body)
            req.session.success = "Receita atualizada!"
            return res.redirect(`/admin/recipes/${req.body.id}/edit`) 
            
        }catch (err) {
            console.error(err)
        }
    },

    async delete(req, res){
        try {   
            const { id } = req.body

            let files = (await Recipe.files(id)).rows
    
            let removeFilesPromise = files.map((file) => File.RecipeDelete(file.id))
            await Promise.all(removeFilesPromise)
    
            removeFilesPromise = files.map((file) => File.delete(file.id))
            await Promise.all(removeFilesPromise)
    
            await Recipe.delete(id)
            
            req.session.success = "Receita deletada com sucesso!"
            return res.redirect(`/admin/recipes`)
            
        }catch (error) {
            console.log(error)   
        }
    }
}