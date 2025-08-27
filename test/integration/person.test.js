const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const database = require('../../src/database')

const serviceUser = require('../../src/services/user')
const servicePerson = require('../../src/services/person')

describe("Teste de Pessoa", () => {

    beforeAll(async () => {
        this.transaction = await database.db.transaction()
    })

    afterAll(() => {
        this.transaction.rollback()
    })

    it("should create a person", async () => {

        const user = {
            email: "emaildeteste@teste.com",
            password: 123456
        }

        const addUser = await serviceUser.Create(user.email, user.password, this.transaction)

        const person = {
            name: "Gian",
            address: "Rua da esquina",
            userId: addUser.id
        }

        const addPerson = await servicePerson.Create(person.name, person.address, person.userId, this.transaction)
        this.id = addPerson.id

        expect(addPerson.name).toBe(person.name)
        expect(addPerson.address).toBe(person.address)
    })

    it("should update a person", async () => {
        const person = {
            id: this.id,
            name: 'Teste',
            address: 'rua 8'
        }

        updatedPerson = await servicePerson.Update(person.id, person.name, person.address, this.transaction)

        expect(updatedPerson.name).toBe(person.name)
        expect(updatedPerson.address).toBe(person.address)
    })

    it("should delete a person", async () => {

        const personToDelete = await servicePerson.Delete(this.id, this.transaction)

        expect(personToDelete).toBe(true)
    })
})