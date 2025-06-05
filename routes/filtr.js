import express from "express";
import connectDB from "../config/mongodb.js";
import FiltrModel from "../config/filtrshema.js";
const filtrRoute = express.Router();
    filtrRoute.post('/add',  async (req, res) =>{
        try{
            const { category, feature } = req.body
            const FiltrData = {
                category,
                feature
            }
            const filtr = new FiltrModel(FiltrData);
            filtr.feature = FiltrData.feature
            console.log(filtr.feature)
            await filtr.save()
            res.status(201).send(filtr);
         }
        catch(error){
            res.status(404).send({success:false, massage:error.massage});
            console.log(error)
        }
    })
filtrRoute.get('/list/:category', async (req, res) =>{
    try{
        const categoryParam = req.params.category
        const FiltrList = await FiltrModel.find()
        function getFeatures(a){
            let result = {}
        for (let i = 0; i < a.length; i++) {
               let categoryList = a[i].category
               for (let j = 0; j < categoryList.length; j++) {
                    if(categoryParam==categoryList[j]){
                        result = a[i].feature
                    } 
               }
        }
        return result
    }
    const featureData = getFeatures(FiltrList)
        res.status(201).send(featureData);
    }
    catch{
        res.status(404).send({success:false, massage:error.massage});
    console.log(error)
}})  
 export default filtrRoute;