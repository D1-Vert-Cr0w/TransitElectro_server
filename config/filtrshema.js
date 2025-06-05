import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FiltrSchema = new Schema({
  category:{
    type: Array,
    required: true
  },
  feature:[{
    name: String,
    value: Array
}]
});

const FiltrModel = mongoose.model.Filtr || mongoose.model('Filtr', FiltrSchema);

export default FiltrModel