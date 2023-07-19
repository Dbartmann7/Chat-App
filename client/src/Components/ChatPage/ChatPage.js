import React from "react"
import ChatBox from "./ChatBox"
import "./ChatPage.css"
import Dashboard from "./UserList/Dashboard.js"
const ChatPage = (props) => {

    return(<div className="chatPageContainer">
        <Dashboard/>
        <ChatBox/>
        
    </div>)
}

export default ChatPage