const mongoose = require("mongoose")

// ✅ Fixed
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  description: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema)