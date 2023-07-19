import React, { useEffect } from "react"

const InputBox = (props) => {
    const {message, setMessage, sendMessage} = props

    const handleEnter = () => {
        if(message.body.length > 0){
            sendMessage()
        }
    }

    return(<>
        <input className="messageInput ChatPageInput"
            placeholder={"Type message..."}
            type="text"
            value={message.body}
            onChange={e => setMessage(prevMessage => {
                    let newMessage = {...prevMessage}
                    newMessage.body = e.target.value
                    return newMessage

                })}
            onKeyDown={e => {if(e.code === "Enter") handleEnter()}}
        />
    </>)
}

export default InputBox