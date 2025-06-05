import express from "express";
import connectDB from "../config/mongodb.js";
import {v2 as cloudinary} from "cloudinary";
import upload from "../middlewhare.js";
import productModel from "../config/productshema.js";
const productRoute = express.Router();

productRoute.post('/add', upload.fields([{name:'image1', maxCount:1}]), async (req, res) =>{
    try{
        const {name, articul, category, subcategory, type, purpose, price, scale, features, description } = req.body
        console.log(req.body)
        const image1 = req.files.image1 && req.files.image1[0]
        const images = [image1].filter((item) => item !== undefined)
        let imagesUrl = await Promise.all(
            images.map(async(item) =>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        const productData = {
            name,
            articul,
            category,
            subcategory,
            type,
            purpose,
            price,
            scale,
            features,
            description,
            image: imagesUrl
        }
        const product = new productModel(productData)
        await product.save()
        res.status(201).send(product);
     }
    catch(error){
        res.status(404).send({success:false, massage:error.massage});
        console.log(error)
    }
})

productRoute.get('/single/:name', async (req, res) =>{
    try{
        const productname = req.params.name
        const singleproduct = await productModel.findOne({name : productname})
        console.log(singleproduct)
        res.status(201).send(singleproduct);
    }
    catch{
        res.status(404).send({success:false, massage:error.massage});
    console.log(error)
}})

productRoute.put('/update/:articul', async (req, res) =>{
    try{
        const productarticul = req.params.articul
        const singleproduct = await productModel.findOneAndUpdate({articul : productarticul},{name:"Товар 4"})
        res.status(201).send(singleproduct);
    }
    catch{
        res.status(404).send({success:false, massage:error.massage});
    console.log(error)
}})

productRoute.get('/list', async (req, res) =>{
    try{
    const category = req.query.category
    const subcategory = req.query.subcategory
    const filtrPreset = req.query.filtrPreset
    const page = req.query.page
    let searchQuery = {}
    if(category!=undefined){
        searchQuery.category = category
    }
    if(subcategory!=undefined){
        searchQuery.subcategory = subcategory
    }
    const products = await productModel.find(searchQuery).skip((page-1)*5).limit(5)
    
    function areObjectsEcual(objects, filtr){
        if(filtrPreset==undefined || filtrPreset==""){
            return products
        }
        else{

        filtr = filtr.split(",")
        const result = []
        for (let i = 0; i < objects.length; i++) {
        let curentObject = objects[i]
            for (let feature = 0; feature < objects[i].features.length; feature++){
                let curentfeature = objects[i].features[feature]
                if(filtr.indexOf(curentfeature)!=-1){
                    result.push(curentObject)
                    break
                }
            }
        }
        return result
        }
    }
const dataForClient = areObjectsEcual(products, filtrPreset)

    res.json(dataForClient)
    }
    catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
    }
    });


 productRoute.get('/count', async (req, res) =>{
    try{
        const category = req.query.category
        const subcategory = req.query.subcategory
        let searchQuery = {}
         if(category!="" && subcategory===""){
        searchQuery = {category:category}
    }
    if(category==="" && subcategory!=""){
        searchQuery = {subcategory:subcategory}
    }
    if(category!="" && subcategory!=""){
        searchQuery = {category:category, subcategory:subcategory}
    }
    const quantity = await productModel.countDocuments(searchQuery)
    res.json(quantity/16)
    }
    catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
    }
    })
productRoute.get('/new', async (req, res) => {
        try{
        const products = await productModel.find({}).limit(4)
        res.json(products)
        }
        catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
        }
        
})
productRoute.get('/pop', async (req, res) => {
        try{
        const products = await productModel.find({name:{$in : ["Товар 5","Товар 6","Товар 3","Товар 1"]}}).limit()
        res.json(products)
        }
        catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
        }
        
})
 export default productRoute;