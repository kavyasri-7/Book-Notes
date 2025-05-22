const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  rating: Number,
  notes: String,
  dateRead: Date,
  coverId: String
});

module.exports = mongoose.model('Book', bookSchema);
