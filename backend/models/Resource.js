const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['document', 'second-hand item'], required: true }, // Simplified categories
  link: { type: String }, // URL for digital resources (optional)
  price: { type: Number, default: 0 }, // Price field for second-hand items, can be 0 if free
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  datePosted: { type: Date, default: Date.now },
  isPurchased: { type: Boolean, default: false }, // To track if the resource is purchased
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ID of the user who purchased
  purchaseDate: { type: Date }, // Date of purchase
});

module.exports = mongoose.model('Resource', resourceSchema);
