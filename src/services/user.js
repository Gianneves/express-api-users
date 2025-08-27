const user = require("../model/user")

class ServiceUser {
    async FindAll(transaction) {
        return user.findAll({ transaction })
    }

    async FindById(id, transaction) {
        return user.findByPk(id, {transaction})
    }

    async Create(email, password, transaction) {

        if (!email) {
            throw new Error("Favor informar email")
        } else if (!password) {
            throw new Error("Favor informar senha")
        }

        return user.create({
            email, password
        }, { transaction })
    }

    async Update(id, email, password, transaction) {

        const oldUser = await this.FindById(id, transaction)
        
        oldUser.email = email || oldUser.email
        oldUser.password = password || oldUser.password

        oldUser.save({ transaction })

        return oldUser

    }

    async Delete(id, transaction) {
        const user = await this.FindById(id, transaction)

        user.destroy({ transaction })

        return true
    }
}

module.exports = new ServiceUser()