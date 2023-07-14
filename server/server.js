const express = require("express")
const app = express()
const {connectDB, dbConnection} = require("./db/connect")
const { Server } = require("socket.io")
require("dotenv").config()
app.use(express.json())
const cors = require('cors');
app.use(cors());
const PORT = 5000
const chats = require("./routes/chats")
const usersRoute = require("./routes/users")
const Chats = require("./models/Chats")
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
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()

io.on("connection", (socket) => {
    console.log("user connected")

    const chatsWatcher = Chats.watch()

    chatsWatcher.on("change", (change) => {
        switch(change.operationType){
            case "insert":
                socket.emit("newChat", change.fullDocument)
                break
            case "delete":
                socket.emit("chatDeleted")
                break
            default:
                console.log("error")
        }
    })
})