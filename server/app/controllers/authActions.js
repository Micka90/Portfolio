const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const tables = require('../../database/tables');

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmailWithPassword(req.body.email);
    if (!user) {
      return res.status(422).json({ message: 'Utilisateur non trouvé.' });
    }

    const verified = await argon2.verify(user.password, req.body.password);
    if (!verified) {
      return res.status(422).json({ message: 'Mot de passe incorrect.' });
    }

    delete user.password;

    const accessToken = jwt.sign(
      { id: user.iduser, isAdmin: user.is_admin },
      process.env.APP_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      id: user.iduser,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    console.log('🔍 Refresh token reçu :', refreshToken);

    if (!refreshToken) {
      console.error(' Refresh token absent dans les cookies');
      return res.status(401).send('No refresh token provided.');
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
    } catch (err) {
      console.error(' Erreur de vérification du refresh token:', err.message);
      return res.status(401).send('Invalid refresh token.');
    }

    const user = await tables.user.read(decoded.id);
    if (!user) {
      console.error(' Utilisateur introuvable avec ID:', decoded.id);
      return res.status(404).send('User not found.');
    }

    const accessToken = jwt.sign(
      { id: user.iduser, isAdmin: user.is_admin },
      process.env.APP_SECRET,
      { expiresIn: '1h' }
    );

    res.setHeader('Authorization', `Bearer ${accessToken}`);

    res.status(200).json({
      id: user.iduser,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    });
  } catch (error) {
    console.error(' Erreur inattendue dans refresh:', error.message);
    return res.status(500).send('Internal server error.');
  }
};

const logout = async ({ res }) => {
  res.clearCookie('refreshToken').sendStatus(200);
};

module.exports = {
  login,
  refresh,
  logout,
};
