import React from "react"
import "./ChatDisplay.css"
import Chat from "./Chat"
const ChatsDisplay = ({toUser, messages}) => {

    return(<>
        <div className="ChatsDisplayBox">
          <div className="ChatNameContainer"><h1>{toUser.username}</h1></div>
          <div className="ChatsContainer">
            <ul className="scrollable">
              {messages.toReversed().map((message, i) => {
                  return(<Chat key={i}  message={message} messages={messages}/>)
              })}
            </ul>
            </div>
        </div>
    </>)
}

export default ChatsDisplay