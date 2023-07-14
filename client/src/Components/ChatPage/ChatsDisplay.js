import React from "react"
import "./ChatDisplay.css"
import Chat from "./Chat"
const ChatsDisplay = (props) => {
    const {clientID, messages} = props

    console.log(messages)
    return(<>
        <div className="ChatsDisplayBox">
          <div className="ChatsContainer">
            <ul>
              {messages.map((message, i) => {
                  return(<Chat key={i} clientID={message.username} message={message.body} timeSent={message.timeSent}/>)
              })}
            </ul>
            </div>
        </div>
    </>)
}

export default ChatsDisplay