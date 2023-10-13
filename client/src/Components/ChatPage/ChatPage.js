import React, { useContext, useEffect, useState } from "react"
import {useMediaQuery} from '@react-hook/media-query'
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
    
    useEffect(() => {
        
        if(showDashboard){
            // TODO: add code to switch to dashboard
        }else{
            // TODO: add code to switch to chatbox
        }
    }, [showDashboard])
    return(
       
        <div className="chatPageContainer">
            <ChatBox toUser={toUser} showDashboard={showDashboard} setShowDashboard={setShowDashboard}/>
            {showDashboard ? <Dashboard setToUser={setToUser} setShowDashboard={setShowDashboard}/>: null}
        </div>
  
    
    )
}

export default ChatPage