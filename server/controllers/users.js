const Users = require("../models/Users")

// creates new user from sign up
const createUser = async (req, res) =>{
    try {
        const result = await Users.create({
            username:req.body.username,
            friends: []
        })
        console.log(result)
        res.status(200).json({message:"user created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
}

// returns a requested user without the password
const getUser = async (req, res) => {
    
    try {
        console.log(req.query)
        let user = null
        if(req.query.username){
            user = await Users.findOne({username:{'$regex': req.query.username,$options:'i'}})
        }else if(req.query._id){
            user = await Users.findOne({_id:req.query._id})
        }else{
            res.status(400).json({message:`please enter a username or an id`})
        }
        console.log(user)
        
        if(user){
            res.status(200).json({_id:user._id, username:user.username, friends:user.friends})
        }else{
            res.status(400).json({message:`user ${req.query.username} not found`})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
    
}

const patchFriends = async (req, res) => {
    try{
        const newFriendUser = await Users.findOne({_id:req.body.friendToAdd})
        console.log(newFriendUser)
        if(!newFriendUser){
            res.status(404).json({message:"user not found"})
        }else{
            const user = await  Users.findOne({_id:req.body.userID})
            let userNewFriends = []
            let friendNewFriends = []
            switch(req.body.type){
                case "add":
                    if(!user.friends){
                        userNewFriends = [{_id:newFriendUser._id, username:newFriendUser.username}]
                        friendNewFriends = [{_id:req.body.userID, username:req.body.username}]
                    }else{
                        userNewFriends = [...user.friends, {_id:newFriendUser._id, username:newFriendUser.username}]
                        friendNewFriends = [...newFriendUser.friends, {_id:req.body.userID, username:req.body.username}]
                    }
                    
                    userUpdateRes = await Users.findOneAndUpdate({_id:req.body.userID}, {friends:userNewFriends})
                    friendUpdateRes = await Users.findOneAndUpdate({_id:newFriendUser._id}, {friends:friendNewFriends})
                    res.status(200).json({message:`new friend ${newFriendUser._id} added`})
                    console.log("added friend")
                    break
                
                case "remove":
                    userNewFriends = user.friends.filter(friend => friend._id!=req.body.friendToAdd)
                    console.log(userNewFriends)
                    friendNewFriends = newFriendUser.friends.filter(friend => friend._id!=req.body.userID)

                    userUpdateRes = await Users.findOneAndUpdate({_id:req.body.userID}, {friends:userNewFriends})
                    friendUpdateRes = await Users.findOneAndUpdate({_id:newFriendUser._id}, {friends:friendNewFriends})
                    res.status(200).json({message:`${newFriendUser._id} removed from friends list`})
                    console.log("removedFriend")
                    break
                default:   
                    res.status(400).json({message:"invalid operation type"})
                    break
            }
            
            
            
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
}

module.exports = {getUser, createUser, patchFriends}