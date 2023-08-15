import React, { useContext, useEffect, useState } from "react"

import ChatBox from "./ChatBox"
import "./ChatPage.css"
import Dashboard from "./UserList/Dashboard.js"
import { UserContext } from "../../Contexts/UserContext"

const ChatPage = (props) => {
    const {friends, updateFriends, userID, setLoggedIn, socket} = useContext(UserContext)
    const [toUser, setToUser] = useState({username:null, _id:null})

    useEffect(() => {
    
        socket.on("friendsChanged", async () => {
            console.log("friends changed on db")
            await updateFriends()
            console.log(friends)
        })
        
        socket.on("disconnect", () => {
            alert("lost connection to the server")
        })

        return () => {
            socket.emit("user disconnecting")
        }
    }, [])
    
    return(<div className="chatPageContainer">
        <Dashboard setToUser={setToUser}/>
        <ChatBox toUser={toUser}/>
        
    </div>)
}

export default ChatPage