const servicePerson = require("../services/person")

class ApiUser {
    
    async FindAll(_, res) {
        try {
            const result = await servicePerson.FindAll()
            
            res.status(200).send({ result })
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async FindById(req, res) {
        try {
            const { id } = req.params
            const result = await servicePerson.FindById(id)

            res.status(200).send({ result })
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async Create(req, res) {
        try {
            const { name, address, userId } = req.body
            await servicePerson.Create(name, address, userId)
            
            res.status(201).send()
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params
            const { name, address } = req.body
            const result = await servicePerson.Update(id,  name, address)

            res.status(200).send({ result })
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params
            await servicePerson.Delete(id)
            
            res.status(204).send()
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }
}


module.exports = new ApiUser();