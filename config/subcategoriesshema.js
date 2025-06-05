import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  src:{
    type: String,
    required: true
  },
  parentCategory:{
    type: String,
    required: true
  },
  image:{
    type: Array,
    required: true
  }
});

const SubCategoriesModel = mongoose.model.SubCategory || mongoose.model('SubCategory', SubCategoriesSchema);

export default SubCategoriesModel