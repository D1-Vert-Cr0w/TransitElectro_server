import express from "express";
import connectDB from "../config/mongodb.js";
import {v2 as cloudinary} from "cloudinary";
import upload from "../middlewhare.js";
import SubCategoriesModel from "../config/subcategoriesshema.js";
const subCategoriesRoute = express.Router();
    subCategoriesRoute.post('/add', upload.fields([{name:'image1', maxCount:1}]), async (req, res) =>{
        try{
            const {name, src, parentCategory } = req.body
            console.log(req.body)
            const image1 = req.files.image1 && req.files.image1[0]
            const images = [image1].filter((item) => item !== undefined)
            let imagesUrl = await Promise.all(
                images.map(async(item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                    return result.secure_url
                })
            )
            const SubCategoriesData = {
                name,
                src,
                parentCategory,
                image: imagesUrl
            }
            const subсategory = new SubCategoriesModel(SubCategoriesData);
            console.log(subсategory );
            await subсategory .save()
            res.status(201).send(subсategory );
         }
        catch(error){
            res.status(404).send({success:false, massage:error.massage});
            console.log(error)
        }
    })
    subCategoriesRoute.get('/list/:parentCategory', async (req, res) =>{
        const parentCategory = req.params.parentCategory
        try{
            const SubCategoriesList = await SubCategoriesModel.find({parentCategory: parentCategory},)
            console.log(SubCategoriesList)
            res.status(201).send(SubCategoriesList);
        }
        catch{
            res.status(404).send({success:false, massage:error.massage});
        console.log(error)
    }})   


 export default subCategoriesRoute;