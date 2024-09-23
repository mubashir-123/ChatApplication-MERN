import Conversation from "../models/conversation.models.js";
import Message from '../models/message.models.js'


const sendMessage = async (req, res)=> {
   try{
       const {message} = req.body;
       const {id: recieverId} = req.params;
       const senderId = req.user._id;

       let conversation = await Conversation.findOne({
        participants: {$all: [senderId, recieverId]},
       })

       if(!conversation){
          conversation = await Conversation.create({ 
              participants: [senderId, recieverId],
          });
       } 

       const newMessage = new Message({
        senderId,
        recieverId,
        message
       })

       if(newMessage){
        conversation.message.push(newMessage._id);
       }
       //Socket IO Functionality
       await Promise.all([conversation.save(), newMessage.save()]);

       res.status(201).json(newMessage);
   }
   catch(error){
    console.log("Error while sending the message",error.message);
    res.status(500).json({error: "Error while sending the message"})
   }
}

const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all:[senderId,userToChatId]},
        }).populate("message"); //Not reference but actual message

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.message;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error while getting messages",error.message);
        res.status(500).json({Error: "Error while getting messages"});
    }
}

export {sendMessage, getMessages};