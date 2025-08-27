const { describe, expect, beforeAll, afterAll } = require('@jest/globals')

const serviceUser = require('../../src/services/user')
const database = require('../../src/database')

describe("Teste de usuário", () => {

    beforeAll(async () => {
        this.transaction = await database.db.transaction()
    })

    afterAll(() => {
        this.transaction.rollback()
    })

    it("should create an user", async () => {
        const user = {
            email: "emaildeteste@teste.com",
            password: 123456
        }

        const addUser = await serviceUser.Create(user.email, user.password, this.transaction)
        this.id = addUser.id

        expect(addUser.email).toBe(user.email)
        expect(addUser.password).toBe(user.password)
    })

    it("should update an user", async () => {
        const user = {
            id: this.id,
            email: "emailalterado@teste.com",
            password: 123456
        }

        const updatedUser = await serviceUser.Update(user.id, user.email, user.password, this.transaction)

        expect(updatedUser.email).toBe(user.email)
        expect(updatedUser.password).toBe(user.password)
    })

    it("should delete an user", async () => {
        const user = {
            id: this.id,
        }

        const deletedUser = await serviceUser.Delete(user.id, this.transaction)

        expect(deletedUser).toBe(true)
    })
})