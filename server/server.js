const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server avviato su ${PORT}`)))
  .catch(err => {
    console.error('Errore di connessione a MongoDB:', err.message);
    process.exit(1);
  });


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

const listRoutes = require('./routes/list');
app.use('/api/lists', listRoutes);

app.get('/', (req, res) => {
  res.send('BookClub API attiva!');
});

// Gestione errori globali (opzionale)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Errore server' });
});
