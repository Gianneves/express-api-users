const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        res.status(400).json({ msg: "token inválido ou não fornecido" })
        return
    }

    jwt.verify(token, 'MinhaSenhaSecreta', (err, decoded) => {
        if (err) {
             res.status(400).json({ msg: "token inválido ou não fornecido" })
             return
        }

        console.log('jwt: ' + decoded)
        req.session = decoded
        next()
    })


}

module.exports = authMiddleware