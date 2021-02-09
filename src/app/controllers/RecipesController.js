
const Recipe = require("../models/Recipe")
const File = require("../models/Files")
const {date} = require("../../lib/utils")


module.exports = {
    async index(req, res) {
        try {
            let {page, limit} = req.query 
        
            page = page || 1 
            limit = limit || 6 
            let offset = limit * (page -1)
        
            const params = {
                page,
                limit,
                offset
        }
        
        let results = await Recipe.paginate(params)
        const recipes = results.rows

        const pagination ={
            total: Math.ceil(recipes[0].total/limit),
            page
        }

        async function getImage(recipeId) {
            let results = await Recipe.files(recipeId);
            const file = results.rows[0];
    
            return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
        }
    
        const recipesPromise = recipes.map(async recipe => {
            recipe.image = await getImage(recipe.id);
            return recipe;
        });
    
        const allRecipes = await Promise.all(recipesPromise);

            return res.render('admin/recipes/index', { recipes: allRecipes , pagination })
        } 
        catch (err) {
            console.error(err)
        }
    },

    async myRecipes(req, res) {
        try {
            let {page, limit} = req.query 
        
            page = page || 1 
            limit = limit || 6 
            let offset = limit * (page -1)
        
            const params = {
                page,
                limit,
                offset
        }
        
        let results = await Recipe.paginate(params)
        const recipes = results.rows

        const pagination ={
            total: Math.ceil(recipes[0].total/limit),
            page
        }

        async function getImage(recipeId) {
            let results = await Recipe.files(recipeId);
            const file = results.rows[0];
    
            return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
        }
    
        const recipesPromise = recipes.map(async recipe => {
            recipe.image = await getImage(recipe.id);
            return recipe;
        });
    
        const allRecipes = await Promise.all(recipesPromise);

        allRecipes = allRecipes.filter(recipe => recipe.user_id == req.session.userId)

            return res.render('admin/recipes/index', { recipes: allRecipes , pagination })
        } 
        catch (err) {
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
            const keys = Object.keys(req.body);
        for( key of keys ){
            if(req.body[key] == ""){return res.send("PREENCHA TODOS OS CAMPOS!")}
        }
        
        if(req.files.length == 0){res.send("Please, send at least one file")}
        
        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

      const filesPromise = req.files.map( file => File.createRecipeFile({
        ...file,
        recipe_id: recipeId
      }))

      await Promise.all(filesPromise)

        return res.redirect(`/admin/recipes/${recipeId}`)
      }
        catch (err) {
            console.error (err)
        }
        
    },

    async show(req, res) {
        try {
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

            return res.render("admin/recipes/show", { recipe, files })
        
        }catch (err) {
            console.error (err)
        }
        
    },

    async edit(req, res){
        try{
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

            return res.render('admin/recipes/edit', { recipes, chef_selection, files })
        
        }catch (err) {
            console.error(err)
        } 
    },

    async put(req, res){
        try{
            console.log(req.files)
            const keys = Object.keys(req.body)
                for( key of keys ){
                    if(req.body[key] == "" && key != "removed_files"){
                return res.send("PREENCHA TODOS OS CAMPOS!")
            }
        }
        
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
            return res.redirect(`/admin/recipes/${req.body.id}`) 
            
        }catch (err) {
            console.error(err)
        }
    },

    async delete(req, res){
        try {   
            const { id } = req.body;

            let files = (await Recipe.files(id)).rows;
    
            let removeFilesPromise = files.map((file) => File.RecipeDelete(file.id));
            await Promise.all(removeFilesPromise);
    
            removeFilesPromise = files.map((file) => File.delete(file.id));
            await Promise.all(removeFilesPromise);
    
            await Recipe.delete(id);
    
                return res.redirect(`/admin/recipes`)
            
            }catch (error) {
            console.log(error)   
            }
    }
}