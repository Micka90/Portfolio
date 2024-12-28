const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const tables = require('../../database/tables');

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmailWithPassword(req.body.email);

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(user.password, req.body.password);
    if (verified) {
      delete user.password;

      const accessToken = jwt.sign(
        { id: user.iduser, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        { expiresIn: '1h' }
      );

      const refreshToken = jwt.sign(
        { id: user.iduser, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        { expiresIn: '1d' }
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      res
        .status(200)
        .header('Authorization', `Bearer ${accessToken}`)
        .json(user);
    } else {
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
      console.error('Refresh token missing in cookies');
      return res.status(401).send('No refresh token provided.');
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
    } catch (err) {
      console.error('Failed to verify refresh token:', err.message);
      return res.status(401).send('Invalid refresh token.');
    }

    // console.log("Refresh token decoded:", decoded);

    const user = await tables.user.read(decoded.id);
    if (!user) {
      console.error('User not found with ID:', decoded.id);
      return res.status(404).send('User not found.');
    }

    const accessToken = jwt.sign(
      { id: user.iduser, isAdmin: user.is_admin },
      process.env.APP_SECRET,
      { expiresIn: '1h' }
    );

    // console.log("Access token successfully refreshed for user ID:", user.iduser);
    return res.header('Authorization', `Bearer ${accessToken}`).json(user);
  } catch (error) {
    console.error('Unexpected error in refresh:', error.message);
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
