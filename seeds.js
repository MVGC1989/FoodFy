const { hash } = require('bcryptjs')
const faker = require('faker')

const User = require('./src/app/models/User')

let usersIds = []
let totalUsers = 3


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