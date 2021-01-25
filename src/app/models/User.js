const db = require("../../config/db")
//const {hash} = require("bcryptjs")

module.exports = {//criar usuário adm pelo url
    all(){
        try {
            return db.query(`SELECT * FROM  users ORDER BY users.name ASC`)
        } 
        catch (err) { 
            console.error(err)
        }
    },
    async  findOne(filters){
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key =>{
            query = `${query} ${key}`

            Object.keys(filters[key]).map(field =>{
                query = `${query} ${field} = ${filters[key] [field]}`
            })
        })

        const results = await db.query(query)

        return results.rows[0]
    },

    async create(data){
        try{
            const query = `
                INSERT INTO users (
                    name,
                    email,
                    is_admin
                ) VALUES ($1, $2, $3, $4)
                RETURNING id`

            //const passwordHash = await hash(data.password , 8)

            const values = [
                data.name,
                data.email,
                //passwordHash,
                data.is_admin || false
            ]

            const results = await db.query(query , values)
            return results.rows[0].id
        }catch(error){
            console.error(error)
        }
    }
}