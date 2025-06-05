import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category:{
    type:String,
    required:true,
  },
  subcategory:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true,
  },
  purpose:{
    type:String,
    required:true,
  },
  articul:{
    type: String,
    required: true,
  },
  scale: {
    type: String,
    required: true,
  },
  features:{
    type:Array,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  image:{
    type: Array,
    required: true
  }
});

const productModel = mongoose.model.product || mongoose.model('product', productSchema);

export default productModel