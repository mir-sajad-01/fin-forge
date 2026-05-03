const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token' })
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Authentication is not configured' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
