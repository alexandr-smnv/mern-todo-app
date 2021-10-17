const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const {errorHandler} = require("./middlewares/errorMiddleware");
const {notFound} = require("./middlewares/errorMiddleware");
require('dotenv').config()

// порт
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

// подключение баззы данных
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDb connected'))
  .catch((error) => {
    console.log(`Error: ${error}`)
    process.exit(1)
  })

// роутинг
app.use('/api/auth', require('./routes/userRoutes'))
app.use('/api/notes', require('./routes/noteRoutes'))

// --- deployment ---

__dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(__dirname, 'frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

// --- deployment ---


// middleware
app.use(notFound)
app.use(errorHandler)



app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
