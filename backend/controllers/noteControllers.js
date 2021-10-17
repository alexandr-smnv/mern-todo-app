const Note = require('./../models/Note')
const asyncHandler = require('express-async-handler');


// получение всех заметок
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({user: req.user._id})
  res.json(notes)
})

// создание новой заметки
const createNote = asyncHandler(async (req, res) => {
  const {title, content, category} = req.body

  if (!title || !content || !category) {
    res.status(400)
    throw new Error('Пожалуйста заполните все поля!')

  } else {
    const note = await Note.create({
      title, content, category, user: req.user._id
    })
    res.status(201).json(note)
  }
})

// получение заметки по ID
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).json({message: 'Заметка не найдена'})
  }
})

// изменение заметки
const updateNote = asyncHandler(async (req, res) => {
  const {title, content, category} = req.body

  const note = await Note.findById(req.params.id)

  if (note) {
    // проверка принадлежности заметки пользователю
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Вы не можете изменить данную заметку')
    }

    note.title = title
    note.content = content
    note.category = category

    await note.save()
    res.json(note)
  } else {
    res.status(404)
    throw new Error('Заметка не найдена')
  }

})

// удаление заметки
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (note) {
    // проверка принадлежности заметки пользователю
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401)
      throw new Error('Вы не можете изменить данную заметку')
    }

    await note.remove()
    res.json({message: 'Заметка удалена'})
  } else {
    res.status(404)
    throw new Error('Заметка не найдена')
  }
})


module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote }