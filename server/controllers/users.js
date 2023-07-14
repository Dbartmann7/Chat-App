const Users = require("../models/Users")

// creates new user from sign up
const createUser = async (req, res) =>{
    try {
        await Users.create({
            email:req.body.email,
            username:req.body.username,
            password:req.body.password
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
        res.status(200).json({username:user.username})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
}

module.exports = {getUserAuth, getUser, createUser}