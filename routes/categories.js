import express from "express";
import connectDB from "../config/mongodb.js";
import {v2 as cloudinary} from "cloudinary";
import upload from "../middlewhare.js";
import CategoriesModel from "../config/categoriesshema.js";
const categoriesRoute = express.Router();
    categoriesRoute.post('/add', upload.fields([{name:'image1', maxCount:1}]), async (req, res) =>{
        try{
            const {name, src } = req.body
            console.log(req.body)
            const image1 = req.files.image1 && req.files.image1[0]
            const images = [image1].filter((item) => item !== undefined)
            let imagesUrl = await Promise.all(
                images.map(async(item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                    return result.secure_url
                })
            )
            const CategoriesData = {
                name,
                src,
                image: imagesUrl
            }
            const сategory = new CategoriesModel(CategoriesData);
            console.log(сategory );
            await сategory .save()
            res.status(201).send(сategory );
         }
        catch(error){
            res.status(404).send({success:false, massage:error.massage});
            console.log(error)
        }
    })
categoriesRoute.get('/list', async (req, res) =>{
    try{
        const CategoriesList = await CategoriesModel.find()
        res.status(201).send(CategoriesList);
    }
    catch{
        res.status(404).send({success:false, massage:error.massage});
    console.log(error)
}})  


 export default categoriesRoute;