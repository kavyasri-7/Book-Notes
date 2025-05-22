const express = require('express');
const axios = require('axios');
const Book = require('../models/Book');
const router = express.Router();

function getCoverUrl(coverId) {
  return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : '';
}

router.get('/', async (req, res) => {
  const sort = req.query.sort || 'dateRead';
  const books = await Book.find().sort({ [sort]: -1 });
  res.render('index', { books, getCoverUrl });
});

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', async (req, res) => {
  const { title, author, rating, notes, dateRead } = req.body;
  let coverId = '';

  try {
    const result = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
    coverId = result.data.docs[0]?.cover_i || '';
  } catch (err) {
    console.error('Cover fetch error:', err);
  }

  await Book.create({ title, author, rating, notes, dateRead, coverId });
  res.redirect('/books');
});

router.get('/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit', { book });
});

router.put('/:id', async (req, res) => {
  const { title, author, rating, notes, dateRead } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, rating, notes, dateRead });
  res.redirect('/books');
});

router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
});

module.exports = router;
