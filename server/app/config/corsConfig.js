const cors = require("cors");

const corsOptions = {
  origin: [
    process.env.CLIENT_URL, // URL de votre client, par exemple http://localhost:3000
    "http://mysite.com",
    "http://another-domain.com",
  ],
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
