const express = require('express');
const router = express.Router();
const List = require('../models/List');
const auth = require('../middleware/authMiddleware');

// Crea nuova lista
router.post('/', auth, async (req, res) => {
  try {
    const newList = new List({ name: req.body.name, user: req.user.id });
    await newList.save();
    return res.status(201).json(newList);
  } catch (err) {
    return res.status(500).json({ msg: 'Errore creazione lista', error: err.message });
  }
});

// Ottieni tutte le liste dell’utente
router.get('/', auth, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id }).populate('books');
    return res.json(lists);
  } catch (err) {
   return res.status(500).json({ msg: 'Errore recupero liste' });
  }
});

// Aggiungi o rimuovi libro da una lista
router.put('/:id', auth, async (req, res) => {
  try {
    const { bookId, action } = req.body;
    const list = await List.findOne({ _id: req.params.id, user: req.user.id });
    if (!list) return res.status(404).json({ msg: 'Lista non trovata' });

    if (action === 'add') {
      if (!list.books.includes(bookId)) list.books.push(bookId);
    } else if (action === 'remove') {
      list.books = list.books.filter(id => id.toString() !== bookId);
    }

    await list.save();
   return res.json(list);
  } catch (err) {
    return res.status(500).json({ msg: 'Errore modifica lista', error: err.message });
  }
});

// Elimina una lista intera
router.delete('/:id', auth, async (req, res) => {
  try {
    const list = await List.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!list) return res.status(404).json({ msg: 'Lista non trovata' });
    return res.json({ msg: 'Lista eliminata' });
  } catch (err) {
    return res.status(500).json({ msg: 'Errore eliminazione lista', error: err.message });
  }
});

module.exports = router;
