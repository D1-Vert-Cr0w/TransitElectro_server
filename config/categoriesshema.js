import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  src:{
    type: String,
    required: true
  },
  image:{
    type: Array,
    required: true
  }
});

const CategoriesModel = mongoose.model.Category || mongoose.model('Category', CategoriesSchema);

export default CategoriesModel