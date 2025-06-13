const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, trim: true, lowercase: true, match: [/.+@.+\..+/, 'Email non valida'] },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
      },
      message: 'La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale.'
    }
  }
}, { timestamps: true });

// Indice unico case-insensitive per email
UserSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

module.exports = mongoose.model('User', UserSchema);
