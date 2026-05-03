const express = require('express')
const mongoose = require('mongoose')

const Transaction = require('../models/Transaction')
const auth = require('../middleware/auth')

const router = express.Router()

function validateTransactionInput(body) {
  const { date, amount, category, type, description } = body
  const parsedDate = new Date(date)

  if (!date || Number.isNaN(parsedDate.getTime())) {
    return 'Valid date is required'
  }

  if (typeof category !== 'string' || !category.trim()) {
    return 'Category is required'
  }

  if (typeof description !== 'string' || !description.trim()) {
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
    category: body.category.trim(),
    type: body.type,
    description: body.description.trim()
  }
}

router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1, createdAt: -1 })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', auth, async (req, res) => {
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

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', auth, async (req, res) => {
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

module.exports = router
