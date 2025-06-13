const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.error('Token mancante');
    return res.status(401).json({ msg: 'Accesso negato' });
  }

  // Supporta formato "Bearer <token>"
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Token non valido:', err.message);
    res.status(401).json({ msg: 'Accesso negato' });
  }
};
