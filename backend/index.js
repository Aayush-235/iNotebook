const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000


connectToMongo()

// Available Routes

app.use(express.json()) //middleware for req.body

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


app.get('/', (req, res) => {
  res.send('Hello Aayush!')
})

app.listen(port, () => {
  console.log(`iNotebook backend on port http://localhost:${port}`)
})


