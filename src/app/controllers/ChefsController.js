const Chef = require("../models/Chef")
const Recipe = require("../models/Recipe")
const File = require("../models/Files")
const {date, getParams} = require("../../lib/utils")


module.exports = {

  async index(req, res){
    try{
      const success = req.session.success
      req.session.success = ""

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
      if(results.rows.length == 0){
        return res.render("admin/chefs/index")
      }else{
        
        const chef = results.rows
        
        const pagination ={
          total: Math.ceil(chef[0].total/limit),
          page
        }
        
        async function getImage(chefId) {
          let results = await Chef.files(chefId)
          const file = results.rows[0]
          
          return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }
        
        const chefsPromise = chef.map(async chef => {
          chef.image = await getImage(chef.id)
          return chef
        })
        
        const allChefs = await Promise.all(chefsPromise)
        return res.render('admin/chefs/index', { chefs: allChefs , pagination, success})
        
      }
      }catch (err) {
      console.error(err)
    }
  },

  create(req, res) {
    return res.render("admin/chefs/create")
  }, 

  async post(req, res) {
    try {
      const filePromise = req.files.map( file => File.create({...file}))

      let results = await filePromise[0]
      const fileId = results.rows[0].id

      results = await Chef.create(
        req.body, 
        fileId
        )
      const chefId = results.rows[0].id
      
      req.session.success = "Chef criado com sucesso!"
      return res.redirect(`/admin/chefs/${chefId}`)
    } 
    catch (err) {
      console.error(err)
    }
  },

  async show(req, res) {
    try {
      const success = req.session.success
      req.session.success = ""

      const id  = req.params.id

      //Pega os dados do chef
      let result = await Chef.find(id)
      const chef = result.rows[0]

      if(!chef) return res.render("parts/page-not-found")

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

      return res.render("admin/chefs/show", { chef, recipes:allChefRecipes, files, success })
    
    }catch (err) {
      console.error(err)
    }
  },

  async edit(req, res) {
    try {
      const error = req.session.error
      req.session.error = ""

      let results = await Chef.find(req.params.id)
      const chef = results.rows[0]
      
      if (!chef) return res.render("parts/page-not-found")

      results = await Chef.files(chef.id)
      let files = results.rows
  
      files = files.map( file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))
      
      return res.render("admin/chefs/edit", { chef, files, error }) 
    } 
    catch (err) {
      console.error(err)
    }
  },

  async update(req, res) { 
    try{
        let results = await Chef.find(req.body.id)
        const chef = results.rows[0].file_id

        if(!chef) return res.render("parts/page-not-found")

        if (req.file) {
          const results = await File.update(
            chef,
            {...req.file}
          )

          let id = results.rows[0].id
          await Chef.update(req.body, id)
        } 
        else{
          await Chef.update_name(req.body)
        }
      req.session.success = "Chefe atualizado !"
      return res.redirect(`/admin/chefs/${req.body.id}`)
  
    }catch (err) {
    console.error(err)
  }
},
  
async delete(req, res) {
  try {
    const { id } = req.body

    //Buscando o chefe para excluir
    const chef = (await Chef.find(id)).rows[0]

    if (!chef) return res.render("parts/page-not-found")

    if(chef.total_recipes >= 1){
      req.session.error = "Chefes que possuem receitas não podem ser deletados!"
      res.redirect(`/admin/chefs/${req.body.id}/edit` )
    
    }else {
      //Deletando o chef e o arquivo do chefe buscado
      const file = await Chef.files(id)
      await Chef.delete(id)
      await File.delete(file.id)

    //Redirecionando para a pagina com todos os chefs.
    req.session.success = "Chef deletado!"
    return res.redirect("/admin/chefs")
    }
    
  } catch (error) {
    throw new Error(error)
  }
},

}