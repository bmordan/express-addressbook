const User = require("./models")

describe("User", () => {
    it("has a username", () => {
        return User.create({username: "Test Bobcat"})
            .then(user => {
                expect(user.username).toEqual("Test Bobcat")
                expect(user.id).toBeTruthy()
            })
    })
})