import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRoute from "./routes/colection.js";
import categoriesRoute from "./routes/categories.js";
import filtrRoute from "./routes/filtr.js";
import subCategoriesRoute from "./routes/subcategories.js";
//Подключение к Mongo
app.use(cors());
connectDB();
connectCloudinary()

const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// Чтение сертификата и ключа
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

//Роуты
app.use('/colection', productRoute);
app.use('/filtr', filtrRoute);
app.use('/categories', categoriesRoute);
app.use('/subcategories', subCategoriesRoute);

// Запуск HTTPS-сервера
const PORT = 443; // Стандартный порт для HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

