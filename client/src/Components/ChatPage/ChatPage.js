import React, { useEffect, useState } from "react"
import ChatBox from "./ChatBox"
import "./ChatPage.css"
import UserList from "./UserList"
const ChatPage = (props) => {

    return(<div className="chatPageContainer">
        <div className="placeholder"></div>
        <ChatBox/>
        <UserList/>
    </div>)
}

export default ChatPage