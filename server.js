import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRoute from "./routes/colection.js";
import categoriesRoute from "./routes/categories.js";
import filtrRoute from "./routes/filtr.js";
import subCategoriesRoute from "./routes/subcategories.js";
import https from "https";
import fs from "fs";

const app = express();

//Подключение к Mongo
app.use(cors({
  origin: 'https:transit-electro-client.vercel.app', // или массив разрешенных доменов
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
connectDB();
connectCloudinary()

// Чтение сертификата и ключа
const options = {
  key: fs.readFileSync('../key.pem'),
  cert: fs.readFileSync('../cert.pem')
};

//Роуты
app.use('/colection', productRoute);
app.use('/filtr', filtrRoute);
app.use('/categories', categoriesRoute);
app.use('/subcategories', subCategoriesRoute);

// Запуск HTTPS-сервера
const PORT = 5000; // Стандартный порт для HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

