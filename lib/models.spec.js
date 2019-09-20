const {User, Contact} = require("./models")
const db = require("../db")

describe("User", () => {
    beforeAll(() => {
        return db.sync()
    })

    it("has a username", () => {
        return User.create({username: "Test Bobcat"})
            .then(user => {
                expect(user.username).toEqual("Test Bobcat")
                expect(user.id).toBeTruthy()
            })
    })
})

describe("Contact", () => {
    beforeAll(() => {
        return db.sync()
    })

    it("has a name and a phone number", () => {
        return User.create({username: "Lord Test"})
            .then(user => {
                return Promise.all([
                    Contact.create({name: "Lord Stuch", tel: 123123123}),
                    Contact.create({name: "Simon le Cube", tel: 234234234})
                ]).then(contacts => {
                    return user.setContacts(contacts).then(() => {
                        return user.getContacts()
                    })
                }).then(contacts => {
                    expect(contacts.length).toBe(2)
                    expect(contacts[0].name).toEqual("Lord Stuch")
                })
            })
    })
})