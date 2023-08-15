const express = require("express")
const app = express()
const {connectDB} = require("./db/connect")
const { Server } = require("socket.io")
require("dotenv").config()
app.use(express.json())
const cors = require('cors');
app.use(cors());

const chats = require("./routes/chats")
const usersRoute = require("./routes/users")
const Users = require("./models/Users")
const io = new Server({
    cors:{
        origin:"*"
    }
})
io.listen(process.env.SOCKET_SERVER_PORT)
app.use("/api/v1/chats", chats)
app.use("/api/v1/users", usersRoute)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("connected to db...")
        app.listen(process.env.EXPRESS_SERVER_PORT, () => {
            console.log(`server listening on port ${process.env.EXPRESS_SERVER_PORT}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()

const usersWatcher = Users.watch()
let users = {}


usersWatcher.on("change", (change) => {

    if(change.operationType === "update" && change.updateDescription.updatedFields.friends){
        if(users[change.documentKey._id]){
            console.log("friend changed")
            users[change.documentKey._id].socket.emit("friendsChanged")
        }
        
    }
})


io.on("connection", (socket) => {

    console.log(`"user connected: ${socket.id}"`)

    socket.on("login", (userData) => {
       
        if(users[userData.userID]){
            socket.emit("login", {status:500, error:"user already on logged in"})
        }else{
            socket.data.userID = userData.userID
            users[userData.userID] = {socket:socket}
            socket.emit("login", {status:200})
            console.log(Object.keys(users))
        }
        
        
    })
    
    socket.on("newChat", ({message, toUser, sentFrom}) => {
        if(users[toUser]){
            const body = message.body
            const timeSent = message.timeSent
            const username = message.username
            users[toUser].socket.emit("newChat", {sentFrom, body,timeSent, username})
        }
    })

    socket.once("disconnect", async () => {
        delete users[socket.data.userID]
     
        if(socket.disconnected) console.log(`user disconnected ${socket.id}`)
        return
    })
  
})