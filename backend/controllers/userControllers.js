const asyncHandler = require('express-async-handler');
const User = require('./../models/User')
const generateToken = require('./../utils/generateToken')

// регистриция
const registerUser = asyncHandler(async (req, res) => {
  // получение данных
  const {name, email, password, pic} = req.body
  // поиск пользователя
  const userExists = await User.findOne({email})
  // если пользователь существует
  if (userExists) {
    res.status(400)
    throw new Error('Данный пользователь уже зарегистрирован')
  }
  // создание пользователя
  const user = await User.create({
    name, email, password, pic
  })

  // ответ на клиент
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Пользователь не создан')
  }
})

// авторизация
const authUser = asyncHandler(async (req, res) => {
  // получение данных
  const {email, password} = req.body
  // поиск пользователя
  const user = await User.findOne({email})
  // ответ на клиент (если пользователь найдет и пароль правильный)
  if (user && await user.matchPassword(password)) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Неверный email или пароль')
  }


})

// редактирование профиля
const updateUserProfile = asyncHandler(async (req, res) => {
  // поиск пользователя
  const user = await User.findById(req.user._id)

  if (user) {
    // замена параметров, если они есть
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.pic = req.body.pic || user.pic

    if (req.body.password) {
      user.password = req.body.password
    }

    await user.save()
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    })
  }
  else {
    res.status(404)
    throw new Error('Пользователь не найден')
  }
})


module.exports = { registerUser, authUser, updateUserProfile };