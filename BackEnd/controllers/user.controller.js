import User from "../models/user.models.js";

const getUserForSidebars = async(req,res)=>{
   try{
      const userLoggedIn = req.user._id;
      const filterUser = await User.find({_id:{$ne: userLoggedIn}}).select("-password");

      res.status(200).json(filterUser);
   }
   catch(error) {
        console.log("Error occured while get users in sid bars",error.message);
        res.status(500).json({Error: "Error occured while get users in sid bars"});
   }

}

export {getUserForSidebars};