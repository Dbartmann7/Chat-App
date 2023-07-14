import React, { useEffect, useState } from "react"
import "./messageBox.css"
const SendChatBtn = (props) => {
    const {message, sendMessage} = props
    
    const handleClick = () => {

        if(message.length > 0) {
            sendMessage()
        }
        
    }
    
    return(<>
        <button className="sendBtn" type="Submit" onClick={handleClick}>
            Send
        </button>
    </>)
}

export default SendChatBtn