const cors = require("cors");

const allowedOrigins = [process.env.CLIENT_URL];
if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push("http://localhost:3000");
}

const corsOptions = {
    origin: allowedOrigins,
    credentials: true, 
    optionsSuccessStatus: 200,
    exposedHeaders: ["Authorization"],
    allowedHeaders: ["Content-Type", "Authorization"], 
};

module.exports = cors(corsOptions);

