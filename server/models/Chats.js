const mongoose = require("mongoose")

const ChatsSchema = new mongoose.Schema({
    // from:{
    //     type:String,
    //     required:[true, "must provide name"],
    //     trim:true,
    //     maxlength:[20, "name cannot exceed 20 chars"]

    // },
    // to:{
    //     type:String,
    //     required:[true, "must provide name"],
    //     trim:true,
    //     maxlength:[20, "name cannot exceed 20 chars"]

    // },
    body:{
        type:String,
        required:[true, "No body"],
        trim:true,
        maxLength:1000
    },
    username:{
        type:String
    },
    timeSent:{
        type:Number
    }
})



module.exports = mongoose.model("Chats", ChatsSchema)
