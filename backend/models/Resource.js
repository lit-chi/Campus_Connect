const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true }, // URL field for downloading
});

module.exports = mongoose.model('Resource', resourceSchema);
