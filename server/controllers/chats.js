const Chats = require("../models/Chats")

const postChat = async (req, res) => {
    try {
        console.log("dshsdhsd")
        await Chats.create({
            body:req.body.message.body,
            imgURL:req.body.message.imgURL,
            username:req.body.username,
            timeSent:Date.now()
        })
        res.status(200).json({msg:`message ${req.body.message} sent`})
    } catch (error) {
        console.log(error)
    }
}

const getChats = async (req, res) => {
    try{
        // await Chats.deleteMany({})
        const response = (await Chats.find({}).sort({_id:-1})).reverse()
        res.json(response)
    }catch(error){
        console.log(error)
    }
}

module.exports = {postChat, getChats}