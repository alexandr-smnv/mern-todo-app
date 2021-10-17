const jwt = require('jsonwebtoken')

// генерация токена
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '5d'
  })
}

module.exports = generateToken;