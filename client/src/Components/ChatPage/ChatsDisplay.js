import React from "react"
import "./ChatPage.css"
import Chat from "./Chat"
const ChatsDisplay = (props) => {
    const {clientID, messages} = props

    console.log(messages)
    return(<>
        <div className="ChatsDisplayBox">
          {messages===null?
          <p>loading...</p>: 
          <ul>
            {messages.map((message, i) => {
                return(<Chat key={i} clientID={message.username} message={message.body} timeSent={message.timeSent}/>)
            })}
          </ul>}
        </div>
    </>)
}

export default ChatsDisplay