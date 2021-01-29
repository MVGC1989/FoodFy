const db = require('../../config/db')
const fs = require('fs')
const Base = require('./Base')

Base.init({table: 'users'})

module.exports = {
    ...Base,    

    async delete(id) {
        try {

            const recipesResults = await db.query(
                `
            SELECT recipes.*, recipe_id, file_id
            FROM recipes
            LEFT JOIN recipes_files ON (recipes.id = recipes_files.recipe_id)
            WHERE recipes.user_id = $1
            `, [id]
            )
            const recipes = recipesResults.rows

            let files = await Promise.all(recipes.map(async recipe => {

                const results = await db.query(
                    `
                SELECT *
                FROM files
                WHERE files.id = $1
                `, [recipe.file_id])

                return results.rows[0]
            }))

            files.map(async file => {
                fs.unlinkSync(`public/${file.path}`)
            })

            await db.query(`
            DELETE FROM users
            WHERE id = $1
            `, [id])

            return
        } catch (err) {
            console.error(err)
        }
    }

}

/*const db = require("../../config/db")
const {hash} = require("bcryptjs")

function verificationAdminUser(adm) {
    if (adm) {
        return adm = true
    } else {
        return adm = false
    }
  }

module.exports = {//criar usuário adm pelo url
    all(){
        try {
            return db.query(`SELECT * FROM  users ORDER BY users.name ASC`)
        } 
        catch (err) { 
            console.error(err)
        }
    },
    
    async findOne(id){
        return db.query(`
        SELECT * FROM users
        WHERE users.id = $1
        `, [id])
    },

    async create(data, password){
        try{
            const query = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    is_admin
                ) VALUES ($1, $2, $3, $4)
                RETURNING id`

            const passwordHash = await hash(password , 8)

            data.is_admin = verificationAdminUser(data.is_admin)

            const values = [
                data.name,
                data.email,
                passwordHash,
                data.is_admin
            ]

            return db.query(query , values)
            
        }catch(error){
            console.error(error)
        }
    },

    async put(data) {
        try {
            const query = `
                UPDATE users SET
                    name = ($1),
                    email = ($2),
                    is_admin = ($3)
                WHERE id = $4
            `
            data.is_admin = verificationAdminUser(data.is_admin)
    
            const values = [
                data.name,
                data.email,
                data.is_admin,
                data.id
            ]
            
            return db.query(query, values)
    
        } catch (error) {
            console.log(error)
        }
    },
}*/