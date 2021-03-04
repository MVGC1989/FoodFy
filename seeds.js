const { hash } = require('bcryptjs')
const faker = require('faker')

const User = require('./src/app/models/User')
const Chef = require('./src/app/models/Chef')
const File = require('./src/app/models/Files')
const Recipe = require('./src/app/models/Recipe')
const Base = require('./src/app/models/Base')

let usersIds = []

let totalUsers = 6



async function createUsers() {
    const users = []
    const password = await hash('1234', 8)

    while (users.length < totalUsers) {

        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            is_admin: faker.random.boolean(Math.random())
        })
    }

    const usersPromise = users.map(user => User.create(user))
    usersIds = await Promise.all(usersPromise)
}



async function init() {      

    await createUsers()

}

init()