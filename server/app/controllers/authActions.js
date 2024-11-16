const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const tables = require('../../database/tables');

const login = async (req, res, next) => {
  try {
    console.log('Données reçues :', req.body);

    // Vérifiez si l'utilisateur est trouvé dans la base de données
    const user = await tables.user.readByEmailWithPassword(req.body.email);
    console.log('Utilisateur trouvé :', user);

    if (user == null) {
      console.log('Aucun utilisateur trouvé avec cet email.');
      res.sendStatus(422);
      return;
    }

    // Vérifiez le mot de passe
    const verified = await argon2.verify(user.password, req.body.password);
    console.log('Mot de passe vérifié :', verified);

    if (verified) {
      delete user.password;
      const token = await jwt.sign(
        { id: user.Id_user, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).header('Authorization', token).json(user);
    } else {
      console.log('Mot de passe incorrect');
      res.sendStatus(422);
    }
  } catch (err) {
    console.error('Erreur dans la fonction login :', err);
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).send('Access Denied, No refresh token provided.');
    }

    const decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
    const user = await tables.user.read(decoded.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    delete user.password;

    const accessToken = jwt.sign(
      { id: user.iduser, isAdmin: user.is_admin },
      process.env.APP_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.header('Authorization', `Bearer ${accessToken}`).json(user);
  } catch (error) {
    console.error('Erreur dans la fonction refresh :', error);
    return res.status(401).send('Invalid refresh token');
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
