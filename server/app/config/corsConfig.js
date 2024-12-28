const cors = require("cors");

const corsOptions = {
    origin: [
        process.env.CLIENT_URL, 
        "http://another-domain.com",
    ],
    credentials: true, 
    optionsSuccessStatus: 200,
    exposedHeaders: ["Authorization"],
    allowedHeaders: ["Content-Type", "Authorization"], 
};

module.exports = cors(corsOptions);
