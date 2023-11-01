import React, { useContext, useEffect, useRef, useState } from "react"
import ChatBox from "./ChatBox"
import "./ChatPage.css"
import Dashboard from "./UserList/Dashboard.js"
import { UserContext } from "../../Contexts/UserContext"

const ChatPage = (props) => {
    const {friends, updateFriends, socket} = useContext(UserContext)
    const [toUser, setToUser] = useState({username:null, _id:null})
    const [showDashboard, setShowDashboard] = useState(true)
    
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
    
    return(
       
        <div className="chatPageContainer">
            <ChatBox toUser={toUser} showDashboard={showDashboard} setShowDashboard={setShowDashboard}/>
           <Dashboard setToUser={setToUser} showDashboard={showDashboard} setShowDashboard={setShowDashboard}/>
        </div>
  
    
    )
}

export default ChatPage