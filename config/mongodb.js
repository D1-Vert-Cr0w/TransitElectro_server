import mongoose from 'mongoose';

const connectDB = async () => {
    const a =  await mongoose.connect(`mongodb://@127.0.0.1:27017`)
    .then(() => {console.log("mongodb connect")})
}
export default connectDB;