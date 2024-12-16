const express = require('express');
const corsConfig = require('./corsConfig');
const cookieParser = require('cookie-parser');
const path = require("path");

const app = express();

app.use(corsConfig);

app.use((req, res, next) => {
  console.log('Middleware CORS appliqué');
  next();
});

app.use(express.json());

app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../../public/uploads")));

app.use((req, res, next) => {
  console.log('Cookies reçus :', req.cookies);
  next();
});

module.exports = app;
