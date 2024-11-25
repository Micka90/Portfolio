const express = require("express");
const corsConfig = require("./corsConfig");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware pour CORS
app.use(corsConfig);

// Log de débogage pour vérifier que le middleware CORS est appliqué
app.use((req, res, next) => {
    console.log("Middleware CORS appliqué");
    next();
});

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour gérer les cookies
app.use(cookieParser());

// Log de débogage pour vérifier que les cookies sont reçus
app.use((req, res, next) => {
    console.log("Cookies reçus :", req.cookies);
    next();
});

// Ajoutez ici d'autres middlewares si nécessaire

module.exports = app;

