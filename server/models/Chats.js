const mongoose = require("mongoose")

const ChatsSchema = new mongoose.Schema({
    body:{
        type:String,
        required:[true, "No body"],
        trim:true,
        maxLength:1000
    },
    imgURL:{
        type:String||null
    },
    sentFrom:{
        type:String
    },
    username:{
        type:String,
        required:[true, "no username"]
    },
    to:{
        required:[true, "no to"],
        type:String
    },
    timeSent:{
        type:Number
    }
})



module.exports = mongoose.model("Chats", ChatsSchema)
