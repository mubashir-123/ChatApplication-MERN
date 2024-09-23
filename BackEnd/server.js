import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import dbConfigure from "./db/dbConfigure.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());  //to parse the incoming request in JSON payload.
app.use(cookieParser());

//Routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/message",messageRoutes);
app.use("/api/v1/users",userRoutes);


app.listen(PORT, 
    dbConfigure(),
    ()=> console.log(`Server is running on port ${PORT}`)
);