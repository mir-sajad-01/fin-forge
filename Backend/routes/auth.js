const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/Users')
const auth = require('../middleware/auth')

const router = express.Router()
const REFRESH_TOKEN_COOKIE = 'refreshToken'
const ACCESS_TOKEN_EXPIRES_IN = '15m'
const REFRESH_TOKEN_EXPIRES_IN = '7d'
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000

function getRefreshSecret() {
  return process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
}

function getRefreshCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: '/api/auth'
  }
}

function clearRefreshCookie(res) {
  const cookieOptions = getRefreshCookieOptions()
  delete cookieOptions.maxAge
  res.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions)
}

function parseCookies(cookieHeader = '') {
  return cookieHeader
    .split(';')
    .map(cookie => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const separatorIndex = cookie.indexOf('=')

      if (separatorIndex === -1) {
        return cookies
      }

      const key = cookie.slice(0, separatorIndex)
      const value = cookie.slice(separatorIndex + 1)

      try {
        cookies[key] = decodeURIComponent(value)
      } catch {
        cookies[key] = value
      }

      return cookies
    }, {})
}

function createAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  )
}

function createRefreshToken(user) {
  return jwt.sign(
    { id: user._id, type: 'refresh' },
    getRefreshSecret(),
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  )
}

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
    const nameValue = typeof name === 'string' ? name.trim() : ''
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
    const passwordValue = typeof password === 'string' ? password : ''

    if (!nameValue) {
      return res.status(400).json({ message: 'Name is required' })
    }

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    if (passwordValue.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(passwordValue, 10)
    const user = new User({
      name: nameValue,
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
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
    const passwordValue = typeof password === 'string' ? password : ''

    if (!normalizedEmail || !passwordValue) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: normalizedEmail })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(passwordValue, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const accessToken = createAccessToken(user)
    const refreshToken = createRefreshToken(user)

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, getRefreshCookieOptions())

    res.json({ accessToken, user: sanitizeUser(user) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/refresh', async (req, res) => {
  try {
    const cookies = parseCookies(req.headers.cookie)
    const refreshToken = cookies[REFRESH_TOKEN_COOKIE]

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' })
    }

    const decoded = jwt.verify(refreshToken, getRefreshSecret())

    if (decoded.type !== 'refresh') {
      clearRefreshCookie(res)
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const user = await User.findById(decoded.id)

    if (!user) {
      clearRefreshCookie(res)
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const accessToken = createAccessToken(user)

    res.json({ accessToken, user: sanitizeUser(user) })
  } catch (error) {
    clearRefreshCookie(res)
    res.status(401).json({ message: 'Invalid refresh token' })
  }
})

router.post('/logout', (req, res) => {
  clearRefreshCookie(res)
  res.json({ message: 'Logged out successfully' })
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
