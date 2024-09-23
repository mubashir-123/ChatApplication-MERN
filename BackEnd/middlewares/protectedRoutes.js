import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectedRoutes = async(req, res, next)=> {
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({error: "Unauthorized access - No token provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({error: "Unauthorized token cannot decode it"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(404),json({Error: "No user found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected routes", error.message);
        res.status(500).json({Error: "Error in protected routes"});
    } 

}

export default protectedRoutes;
