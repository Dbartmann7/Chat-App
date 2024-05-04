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
io.listen(process.env.SOCKET_SERVER_PORT, { transports: ["websocket"], upgrade: false }, )
app.use("/api/v1/chats", chats)
app.use("/api/v1/users", usersRoute)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("connected to db...")
        app.listen(process.env.PORT || 5000, () => {
            console.log(`server listening on port ${process.env.EXPRESS_SERVER_PORT}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()

const usersWatcher = Users.watch()
// keeps track of the sockets for users currently logged in
let users = {}


usersWatcher.on("change", (change) => {
    // if a user's friend list is updated and that user is logged in, let the user's client know
    if(change.operationType === "update" && change.updateDescription.updatedFields.friends){
        if(users[change.documentKey._id]){
            console.log("friend changed")
            users[change.documentKey._id].socket.emit("friendsChanged")
        }
        
    }
})

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

// **** SOCKETS **** //
io.on("connection", (socket) => {

    console.log(`"user connected: ${socket.id}"`)
    // Send 500 if user is already logged in
    // create new socket with userID, add to list of users
    socket.on("login", (userData) => {
        if(users[userData.userID]){
            socket.emit("login", {status:500, error:"user already on logged in"})
        }else{
            socket.data.userID = userData.userID
            users[userData.userID] = {socket:socket}
            socket.emit("login", {status:200})
        }
    })
    
    // when new chat is sent, send the chat directly to the user if they are logged in
    socket.on("newChat", ({message, toUser, sentFrom}) => {
        if(users[toUser]){
            const body = message.body
            const timeSent = message.timeSent
            const username = message.username
            users[toUser].socket.emit("newChat", {sentFrom, body,timeSent, username})
        }
    })

    // remove user socket from users when user disconnects
    socket.once("disconnect", async () => {
        delete users[socket.data.userID]
     
        if(socket.disconnected) console.log(`user disconnected ${socket.id}`)
        return
    })
  
})