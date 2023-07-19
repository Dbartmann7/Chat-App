const Users = require("../models/Users")

// creates new user from sign up
const createUser = async (req, res) =>{
    try {
        await Users.create({
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            friends: []
        })
        res.status(200).json({message:"user created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
}

// gets requested user details to compare passwords at log in
const getUserAuth = async (req, res) => {
    try{
        console.log(req.query.username)
        const user = await Users.findOne({username:req.query.username})
        res.json(user)

    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
}


// returns a requested user without the password
const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({username:req.query.username})
        if(user){
            res.status(200).json({username:user.username})
        }else{
            res.status(404).json({message:`user ${req.query.username} not found`})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
}

const addFriend = async (req, res) => {
    try{
        const newFriendUser = await Users.findOne({username:req.body.friendToAdd})
        if(!newFriendUser){
            res.status(404).json({message:"user not found"})
        }else{
            const user = await  Users.findOne({username:req.body.username})
            console.log(user)
            let newFriends = []
            if(!user.friends){
                newFriends = [{username:newFriendUser.username, _id:newFriendUser._id}]
            }else{
                newFriends = [...user.friends, {username:newFriendUser.username, _id:newFriendUser._id}]
            }
            const updateRes = await Users.findOneAndUpdate({username:req.body.username}, {friends:newFriends})
            console.log(updateRes)
            res.status(200).json({message:`new friend ${req.body.username} added`})
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
}

module.exports = {getUserAuth, getUser, createUser, addFriend}