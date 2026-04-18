const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const User = require('./models/Users')
const Transaction = require('./models/Transaction')
const auth = require('./middleware/auth')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
}

function validateTransactionInput(body) {
  const { date, amount, category, type, description } = body

  if (!date || !category || !type || !description?.trim()) {
    return 'All fields are required'
  }

  if (!['income', 'expense'].includes(type)) {
    return 'Invalid type'
  }

  if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
    return 'Amount must be positive'
  }

  return null
}

function buildTransactionPayload(body, userId) {
  return {
    userId,
    date: body.date,
    amount: Number(body.amount),
    category: body.category,
    type: body.type,
    description: body.description.trim()
  }
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' })
    }

    if (!emailRegex.test(email || '')) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    })

    await user.save()

    res.json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const normalizedEmail = (email || '').trim().toLowerCase()

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: normalizedEmail })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token, user: sanitizeUser(user) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1, createdAt: -1 })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/transactions', auth, async (req, res) => {
  try {
    const validationError = validateTransactionInput(req.body)

    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const newTransaction = new Transaction(buildTransactionPayload(req.body, req.user.id))
    const saved = await newTransaction.save()

    res.json(saved)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/transactions/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid transaction id' })
    }

    const validationError = validateTransactionInput(req.body)

    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      buildTransactionPayload(req.body, req.user.id),
      { new: true, runValidators: true }
    )

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/api/transactions/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid transaction id' })
    }

    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    await Transaction.findByIdAndDelete(req.params.id)

    res.json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
