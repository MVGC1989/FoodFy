const db = require('../../config/db')
const {date} = require('../../lib/utils')


module.exports = {
    all(){ 
        try {
            return db.query(`SELECT recipes.*, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ORDER BY created_at DESC`
            ) 
        } catch (error) {
            console.error(error)
        }
    },

    create(data){
        const query =  `
            INSERT INTO recipes (
                chef_id,
                title,
                ingredients,
                preparation,
                information,
                created_at,
                user_id
                
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
        `
        const values = [
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
            data.user_id
        ]
        
        return db.query(query, values)
    },

    find(id) {
        return db.query (`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.id = $1`, [id]
        )
    },

    search(filter) {
        return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
            ORDER BY updated_at DESC
            `)
    },

    update(data) {
        const query = `
        UPDATE recipes SET
            chef_id=($1),
            title=($2),
            ingredients=($3),
            preparation=($4),
            information=($5)
        WHERE id= $6
        `
        const values =[
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values)
    },

    async delete(id) {
        try{
            const results = await db.query(`
                SELECT * FROM files
                INNER JOIN recipes_files ON (files.id = recipes_files.file_id)
                WHERE recipes_files.recipe_id = $1`, [id]
            )
        
            const removedFiles = results.rows.map( async file => {
                fs.unlinkSync(file.path)
    
            await db.query(`DELETE FROM recipes_files 
                WHERE recipes_files.file_id =$1`, 
                [file.file_id])
            
                await db.query(`DELETE FROM files WHERE id = $1`, [file.file_id])
            })
    
            return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
        
        }catch(err){
            console.error(err)
        }
    },

    chef_selection() {
        return db.query(`SELECT name, id FROM chefs`
        )
    },

    paginate(params){
        const { filter, limit, offset, user, user_is_admin} = params

        let query = ""
        let filterQuery = ""
        let = userQuery = ""
        
        let totalQuery = `(
            SELECT count(*) FROM recipes
        ) AS total` 
        
        if (filter) { 

            filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
            OR recipes.ingredients ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`
        }

        if (user || user_is_admin) {
            if (user_is_admin) {
                userQuery = '';
                totalQuery = '(SELECT COUNT(*) FROM recipes) AS total';
            } else {
                userQuery = `WHERE user_id = ${user}`;
                totalQuery = `(SELECT COUNT(*) FROM recipes WHERE user_id = ${user}) AS total`;
            }
        }
        
        query = `
        SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ${filterQuery} ${userQuery}
        ORDER BY created_at DESC LIMIT $1 OFFSET $2`
        
        return db.query(query , [limit, offset])
    },

    files(id) {
        try {
            const query =`
            SELECT files.*, recipes_files.recipe_id as recipe_id
            FROM files 
            LEFT JOIN recipes_files ON (files.id = recipes_files.file_id)
            WHERE recipes_files.recipe_id = $1`;

            return db.query(query, [id]);

        } catch (error) {
            console.error(error);
        }
        
    },
}