const db = require('../../config/db')
const fs = require('fs')
const Base = require('./Base')
const Recipe = require('../models/Recipe')
const File = require('../models/Files')


Base.init({table: 'users'})

module.exports = {
    ...Base,    

    async delete(id) {
        try {
            let results = await db.query(`
                SELECT recipes.*, recipe_id, file_id
                FROM recipes
                LEFT JOIN recipes_files ON (recipes.id = recipes_files.recipe_id)
                WHERE recipes.user_id =$1
            `, [id])
            const recipes = results.rows

            //dos produtos, pegar todas as imagens
            const allFilesPromise = recipes.map(recipe =>
            Recipe.files(recipe.id))

            let promiseResults = await Promise.all(allFilesPromise)

            //rodar a remoção do usuário
            await db.query('DELETE FROM users WHERE id = $1', [id])

            //remover as imagens da pasta public
            promiseResults.map(results => {
                results.rows.map(file => {
                    fs.unlinkSync(file.path)
                    File.delete(file.file_id)
                })
            })

    }catch (err) {
            console.error(err)
        }

    },


    async paginate(params) {
        const { limit, offset } = params
        
        const query = `
        SELECT *, (
            SELECT count(*) FROM users
        ) AS total
        FROM users
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
        `

        const results = await db.query(query, [limit, offset])
        return results.rows
    },

}

