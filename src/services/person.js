const person = require("../model/person")
const user = require("../model/user")

class ServicePerson {
    async FindAll(transaction) {
        return person.findAll({ transaction })
    }

    async FindById(id, transaction) {
        return person.findByPk(id, { transaction }, { include: { model: user } })
    }

    async Create(name, address, userId, transaction) {

        if (!name) {
            throw new Error("Favor informar nome")
        } else if (!address) {
            throw new Error("Favor informar endereço")
        } else if (!userId) {
            throw new Error("Favor informar userID")
        }

        return person.create({
            name, address, userId
        }, { transaction })
    }

    async Update(id, name, address, transaction) {

        const oldUser = await this.FindById(id, transaction)
        
        oldUser.name = name || oldUser.name
        oldUser.address = address || oldUser.address

        oldUser.save({ transaction })

        return oldUser

    }

    async Delete(id, transaction) {
        const person = await this.FindById(id, transaction)
        person.destroy({ transaction })

        return true
    }
}

module.exports = new ServicePerson()