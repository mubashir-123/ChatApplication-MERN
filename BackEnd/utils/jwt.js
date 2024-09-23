import jwt from "jsonwebtoken";

const generateTokensAndSetCookies = async (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "1d",
    });

    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,  //MS
        httpOnly: true, //prevent from xss attacks cross-site scripting attacks 
        sameSite: "strict", //prevent CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokensAndSetCookies;