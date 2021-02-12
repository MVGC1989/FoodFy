const Chef = require("../models/Chef")
const Recipe = require("../models/Recipe")
const File = require("../models/Files")
const {date} = require("../../lib/utils")


module.exports = {

  async index(req, res){
    try{
      let {page, limit} = req.query 

      page = page || 1 
      limit = limit || 8 
      let offset = limit * (page -1)

      const params = {
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

      return res.render('admin/chefs/index', { chefs , pagination})
    }
    catch (err) {
      console.error(err)
    }
  },

  create(req, res) {
    return res.render("admin/chefs/create")
  }, 

  async post(req, res) {
    try {
      const keys = Object.keys(req.body)
      
      for (key of keys) {
        if (req.body[key] == "")
        return res.send("PREENCHA TODOS OS CAMPOS!")
      }

      if (req.files == 0){
        return res.send("ENVIE PELO MENOS UMA IMAGEM!")
      }
      
      const filePromise = req.files.map( file => File.create({...file}))

      let results = await filePromise[0]
      const fileId = results.rows[0].id

      results = await Chef.create(
        req.body, 
        fileId
        )
      const chefId = results.rows[0].id
  
      return res.redirect(`/admin/chefs/${chefId}`)
    } 
    catch (err) {
      console.error(err)
    }
  },

  async show(req, res) {
    try {
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
        let results = await Recipe.files(recipeId)
        const file = results.rows[0]

        return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
    })

      const allChefRecipes = await Promise.all(recipesPromise)

      return res.render("admin/chefs/show", { chef, recipes:allChefRecipes, files })
    
    }catch (err) {
      console.error(err)
    }
  },

  async edit(req, res) {
    try {
      let results = await Chef.find(req.params.id)
      const chef = results.rows[0]
      
      if (!chef) return res.send('Chef não encontrado!')

      results = await Chef.files(chef.id)
      let files = results.rows
  
      files = files.map( file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))
  
      return res.render("admin/chefs/edit", { chef, files }) 
    } 
    catch (err) {
      console.error(err)
    }
  },

  async update(req, res) { 
    try{
      const keys = Object.keys(req.body)
        for (key of keys) {
          if (req.body[key] == "" && key != "removed_files"){
            return res.send("PREENCHA TODOS OS CAMPOS!")
          }
        }

        let results = await Chef.find(req.body.id)
        let file_id = results.rows[0].file_id

        if (req.file) {
          const results = await File.update(
            file_id,
            {...req.file}
          )

          let id = results.rows[0].id
          await Chef.update(req.body, id)
        } 
        else{
          await Chef.update_name(req.body)
        }

      return res.redirect(`/admin/chefs/${req.body.id}`)
  
    }catch (err) {
    console.error(err)
  }
},
  
async delete(req, res) {
  try {
    const { id } = req.body

    


    // --> Buscando o chefe para excluir
    const chef = (await Chef.find(id)).rows[0]

    if (!chef) return res.send("Chef não encontrado!")

    if(chef.total_recipes >= 1){
      
      res.redirect(`/admin/chefs/${req.body.id}/edit` )
    
    }else {
      // --> Deletando o chef e o arquivo do chefe buscado
    await Chef.delete(id)
    await File.delete(chef.file_id)

    // --> Redirecionando para a pagina com todos os chefs.
    return res.redirect("/admin/chefs")
    }
    
  } catch (error) {
    throw new Error(error)
  }
},

}