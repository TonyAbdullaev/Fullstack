const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split('')[1] // TypeOfToken Token
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            if(!token) {
                return res.status(401).json({message: "Haven't passed authorization!!"})
            }
            if(decoded.role !== role) {
                // 403 - Don't have a permission
                return res.status(403).json({message: "Don't have a permission"})
            }

            req.user = decoded;
            next()
        } catch (e) {
            //401 - when user haven't authorized
            res.status(401).json({message: "Haven't passed authorization!!"})
        }
    }
}



