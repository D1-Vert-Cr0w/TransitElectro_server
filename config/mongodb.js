import mongoose from 'mongoose';

const connectDB = async () => {
    const a =  await mongoose.connect(`mongodb://AdminCherry:x1a2o3c4@127.0.0.1:27017/test`)
    .then(() => {console.log("mongodb connect")})
}
export default connectDB;