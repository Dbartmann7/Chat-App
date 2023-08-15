const Chats = require("../models/Chats")

const postChat = async (req, res) => {
    try {
        await Chats.create({
            body:req.body.message.body,
            imgURL:req.body.message.imgURL,
            sentFrom:req.body.sentFrom,
            to:req.body.toUser,
            timeSent:req.body.message.timeSent,
            username:req.body.message.username
        })
        res.status(200).json({msg:`message ${req.body.message} sent`})
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error)
    }
}

const getChats = async (req, res) => {
    try{
        // await Chats.deleteMany({})
        const response = (await Chats.find({$or:[{sentFrom:req.query.sentFrom, to:req.query.toUser},{sentFrom:req.query.toUser, to:req.query.sentFrom}]}).sort({_id:-1})).reverse()
        res.json(response)
    }catch(error){
        console.log(error)
        res.status(500).json({error: error})
    }
}

module.exports = {postChat, getChats}