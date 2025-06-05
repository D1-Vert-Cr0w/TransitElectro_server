import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRoute from "./routes/colection.js";
import categoriesRoute from "./routes/categories.js";
import filtrRoute from "./routes/filtr.js";
import subCategoriesRoute from "./routes/subcategories.js";
const app = express();
const port = 5000;
app.use(express.json())
//Подключение к Mongo
app.use(cors());
connectDB();
connectCloudinary()

//Роуты
app.use('/colection', productRoute);
app.use('/filtr', filtrRoute);
app.use('/categories', categoriesRoute);
app.use('/subcategories', subCategoriesRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
