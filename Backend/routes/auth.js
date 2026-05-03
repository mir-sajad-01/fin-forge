const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/Users')
const auth = require('../middleware/auth')

const router = express.Router()

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
}

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
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

router.get('/me', auth, async (req, res) => {
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

module.exports = router
