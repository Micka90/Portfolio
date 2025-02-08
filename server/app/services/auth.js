const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const hashPassword = async (req, res, next) => {
  try {
    req.body.hashedPassword = await argon2.hash(req.body.password);
    delete req.body.password;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Format du token invalide' });
    }

    try {
      req.auth = jwt.verify(token, process.env.APP_SECRET);
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erreur serveur lors de la vérification du token' });
  }
};

module.exports = { hashPassword, verifyToken };
