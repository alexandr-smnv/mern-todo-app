const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('./../models/User')


const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // вытаскиваем токен из headers
      token = req.headers.authorization.split(' ')[1]

      // декодирование токена
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // запись в req.user данных о пользователе кроме пароля
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      res.status(401);
      throw new Error('Авторизация не пройдена. Токен не действителен.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Авторизация не пройдена.')
  }
})

module.exports = { protect }
