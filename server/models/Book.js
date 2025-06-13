const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Il titolo è obbligatorio'],
    trim: true,
    minlength: [2, 'Il titolo deve avere almeno 2 caratteri']
  },
  author: {
    type: String,
    required: [true, 'L\'autore è obbligatorio'],
    trim: true,
    minlength: [2, 'Il nome autore è troppo corto']
  },
  status: {
    type: String,
    required: [true, 'Lo stato è obbligatorio'],
    enum: {
      values: ['letto', 'da leggere'],
      message: 'Stato non valido'
    }
  },
  category: {
    type: String,
    default: 'Generale',
    trim: true
  },
  rating: {
    type: Number,
    min: [0, 'Minimo 0 stella'],
    max: [5, 'Massimo 5 stelle'],
    default: 0
  },
  review: {
    type: String,
    trim: true,
    maxlength: [1000, 'La recensione è troppo lunga']
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
