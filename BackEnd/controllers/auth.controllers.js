import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import generateTokensAndSetCookies from "../utils/jwt.js";

const signup = async (req,res) => {
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;
        
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not matched"});
        }

         const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error: "Username already exist"});
        }

        //hashed passwords
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         
         const profilePicBoy = `https://avatar.iran.liara.run/public/boy?username=${username}`;
         const profilePicGirl = `https://avatar.iran.liara.run/public/girl?username=${username}`; 

         const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "Male" ? profilePicBoy : profilePicGirl,
         })
        
         if(newUser){
            //Generate JWT here 
          await generateTokensAndSetCookies(newUser._id, res);   
         await newUser.save();

         return res.status(201).json({
            newUser
         })
         }
         else{
            res.status(400).json({error:"Invalid user data"});
         }
    }
    catch(error){
        console.log("Error while adding the new user",error.message);
         res.status(500).json({error: "Error while adding the new user"});
    }
}

const login = async (req,res) => {
    try{
    const {username, password} = req.body;
    
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error: "Invalid username or password"});
    }

    generateTokensAndSetCookies(user._id, res);

    return res.status(200).json({user})
  }
  catch(error){
      console.log("Error while login",error.message);
      res.status(500).json({error: "something went wrong while login"});
  }
}

const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logout successfully"});
    }
    catch(error){
      console.log("Something went wrong while logout",error.message);
      res.status(500).json({message: "Something went wrong while logout"})
    }
}

export{signup, login, logout};