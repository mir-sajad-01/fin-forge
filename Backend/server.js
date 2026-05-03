const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const transactionRoutes = require('./routes/transactions')

const app = express()
const requiredEnv = ['MONGO_URI', 'JWT_SECRET']
const missingEnv = requiredEnv.filter(name => !process.env[name])

if (missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${missingEnv.join(', ')}`)
  process.exit(1)
}

app.use(cors())
app.use(express.json())

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ message: 'Invalid JSON body' })
  }

  return next(error)
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((error, req, res, next) => {
  console.error(error.message)
  res.status(500).json({ message: 'Server error' })
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(error => {
    console.error(`MongoDB connection failed: ${error.message}`)
    process.exit(1)
  })
