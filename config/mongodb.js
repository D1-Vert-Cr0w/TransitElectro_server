import mongoose from 'mongoose';

const connectDB = async () => {
    const a =  await mongoose.connect(`mongodb://user1:iGi9VEu38@127.0.0.1:27017/TransitElectro`)
    .then(() => {console.log("mongodb connect")})
}
export default connectDB;