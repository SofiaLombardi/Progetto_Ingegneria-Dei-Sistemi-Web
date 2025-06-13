const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Errore server' });
  }
};

exports.createBook = async (req, res) => {
  try {
    if (!req.body.category || req.body.category.trim() === '') {
      delete req.body.category;
    }
    const newBook = new Book({ ...req.body, user: req.user.id });
    await newBook.save();
    return res.status(201).json(newBook);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ msg: 'Errore di validazione', errors: messages });
    }
    console.error(err);
    return res.status(500).json({ msg: 'Errore server' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    if (!req.body.category || req.body.category.trim() === '') {
      delete req.body.category;
    }
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ msg: 'Libro non trovato' });
    res.json(book);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ msg: 'Errore di validazione', errors: messages });
    }
    console.error(err);
    res.status(500).json({ msg: 'Errore server' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ msg: 'Libro non trovato' });
    res.json({ msg: 'Libro cancellato' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Errore server' });
  }
};
