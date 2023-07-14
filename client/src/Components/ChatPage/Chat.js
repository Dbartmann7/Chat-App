import React, { useEffect } from "react"
import "../../App.css"
import "./Chat.css"
const Chat = (props) => {
    const {clientID, message, timeSent} = props 
    const date = new Date(timeSent)
    console.log(date.getHours())
    return(<>
        <div className="Chat">
            <div className="header">
                <p className="username">{clientID}</p>
                <p className="time">{date.getHours() > 9 ? date.getHours(): "0" + date.getHours()}:
                                    {date.getMinutes() > 9 ? date.getMinutes(): "0" + date.getMinutes()}</p>
            </div>
            <div className="mainBody"> 
                <p>{message}</p>        
            </div>
        </div>
    </>)
}

export default Chat