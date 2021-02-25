const db = require('../../config/db');
const fs = require('fs');

module.exports = {
    create({ filename, path }) {
      try {
        const query = `
          INSERT INTO files (
            name,
            path
          ) VALUES ($1, $2)
          RETURNING id
        `
  
        const values = [
          filename,
          path
        ]
  
        return db.query(query, values)
      } 
      catch (err) {
        console.error(err)
      }
    },

    find(id) {
      try {
        return db.query(
          `
              SELECT *
              FROM files
              WHERE id = $1`,
          [id]
        );
      } catch (error) {
        throw new Error(error);
      }
  },
  
    async createRecipeFile({ filename, path, recipe_id}) {
      try {
        let query = `
          INSERT INTO files (
            name,
            path
          ) VALUES ($1, $2)
          RETURNING id
        `
  
        let values = [
          filename,
          path
        ]
  
        const results = await db.query(query, values)
        const fileId = results.rows[0].id
  
        query = `
          INSERT into recipes_files (
            recipe_id,
            file_id
          ) VALUES ($1, $2)
          RETURNING id
        `
  
        values = [
          recipe_id,
          fileId
        ]
  
        return db.query(query, values)   
      } 
      catch (err) {
        console.error(err)
      }
    },

    update(data, {filename, path}){
      try{
        const query = `
          UPDATE files SET 
          name = ($1),
          path = ($2)
          WHERE id = $3
          RETURNING id`

        const values = [
          filename,
          path,
          data
        ]
      return db.query(query, values)
      
    }catch(err){
      console.error(err)
    }
    },

    async delete(id) {
      try {
        const results = await db.query(
          `SELECT * FROM files WHERE id = $1`, [id]
        )
        const file = results.rows[0]
        fs.unlinkSync(`${file.path}`)

        await db.query(`DELETE FROM recipes_files WHERE file_id = $1`,[id])

        await db.query(`DELETE FROM files WHERE id = $1`, [id])

      }
      catch (err) {
        console.error(err)
      }
    },

    RecipeDelete(id){
      try {
        return db.query(`DELETE FROM recipes_files WHERE file_id = $1`, [id]);
      } catch (error) {
        throw new Error(error);
      }
    }  
}