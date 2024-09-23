import mongoose from "mongoose";

const conersationSchema = new mongoose.Schema(
    {
       participants:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       }
        ],
       message:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        },
       ],
       
    },
    {timestamps: true}
);

const Conversation = mongoose.model("Conversation", conersationSchema);

export default Conversation;