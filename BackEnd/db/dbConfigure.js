import mongoose from "mongoose";

const dbConfigure = async() => {
    try{
         await mongoose.connect(process.env.MONGODB_URI);
         console.log(`Connected to mongodb with URI ${process.env.MONGODB_URI}`);

    }
    catch(err){
        console.log("Error while connecting to MongoDB",err);
    }
}

export default dbConfigure;