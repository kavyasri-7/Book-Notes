require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bookRoutes = require('./routes/books');
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/books', bookRoutes);

app.get('/', (req, res) => res.redirect('/books'));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
