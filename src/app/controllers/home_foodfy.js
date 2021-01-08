const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")
const File = require("../models/Files")
const {date} = require("../../lib/utils")

module.exports = {
    async index(req , res){
        try{
            const {filter} = req.query

            if(filter){
                let results = await Recipe.search(filter)
                const recipes = results.rows
                
                return res.render("home/search", {recipes , filter})
            } else {

                let results = await Recipe.all()
                const recipes = results.rows

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

                return res.render("home/homepage", {recipes: allRecipes})
            }
        } catch (err){
            console.error(err)
        }
    },

    about(req, res){
        return res.render("home/about")
    },

    async index_recipes(req, res){
        try{
            let { filter, page, limit} = req.query 
        
            page = page || 1 
            limit = limit || 6 
            let offset = limit * (page -1)
        
            const params = {
                filter,
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
        
        return res.render("home/recipes", {recipes : allRecipes, pagination, filter})
    
        }catch (err){
        console.error(err)
        }
    },

    async show_recipe(req, res){
        try{
            let result = await Recipe.find(req.params.id)
            const recipe = result.rows[0]

            if(!recipe){
                return res.render("home/notfound")
            }

            recipe.created_at = date(recipe.created_at).format
            
            result = await Recipe.files(recipe.id)
            const files = result.rows.map( file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            return res.render("home/recipe", {recipe , files})
        }catch(err){
            console.error(err)
        }
        
    },
        
    async index_chefs(req, res){
        try{
            let { filter, page, limit} = req.query 
        
            page = page || 1 
            limit = limit || 8 
            let offset = limit * (page -1)
        
            const params = {
                filter,
                page,
                limit,
                offset
        }
        
        let results = await Chef.paginate(params)
        const chef = results.rows

        const pagination ={
            total: Math.ceil(chef[0].total/limit),
            page
        }
            let chefs = (await Chef.all()).rows
            const chefTemp = []

            for(let chef of chefs){
                const file = (await File.find(chef.file_id)).rows[0]

                chefTemp.push({
                    ...chef,
                    image: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
                })
            }

            chefs = chefTemp

            return res.render("home/chefs", {chefs , pagination})
        
        }catch (err){
            console.error(err)
        }
    },

    async show_chef(req , res){
        try{
            const id  = req.params.id

            //Pega os dados do chef
            let result = await Chef.find(id)
            const chef = result.rows[0]

            chef.created_at = date(chef.created_at).format

            //Mostra as receitas de cada chef
            result = await Chef.findRecipesByChef(id)
            const recipes = result.rows
    
            //Mostra avatar do chef
            result = await Chef.files(id)
            const files = result.rows.map( file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            //mostra a imagem de cada receita
            async function getImage(recipeId) {
                let results = await Recipe.files(recipeId);
                const file = results.rows[0];

                return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
            }

            const recipesPromise = recipes.map(async recipe => {
                recipe.image = await getImage(recipe.id);
                return recipe;
            });
      
            const allChefRecipes = await Promise.all(recipesPromise);
      
            return res.render("home/show_chef", { chef, recipes:allChefRecipes, files })
            
        }catch(err){
            console.error(err)
        }
    },

    async search(req,res){
        try{
            const {filter} = req.query

            let results = await Recipe.search(filter)
            const recipes = results.rows

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
            
            
            return res.render("home/search",{ recipes: allRecipes, filter});
        
        } catch (err){
            console.error(err)
        }
    }
}
