const express = require("express");
const corsConfig = require("./corsConfig");

const app = express();

// Middleware pour CORS
app.use(corsConfig);

// Middleware pour parser les requêtes JSON
app.use(express.json());

//Middleware CookieParser                   

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Ajoutez ici d'autres middlewares si nécessaire

module.exports = app;
