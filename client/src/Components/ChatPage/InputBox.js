import React from "react"

const InputBox = (props) => {
    const {message, setMessage, sendMessage} = props

    const handleEnter = () => {
        if(message.length > 0){
            sendMessage()
        }
    }
    return(<>
        <input className="messageInput"
            placeholder={"Type message..."}
            type="text"
            value={message}
            onChange={e => {setMessage(e.target.value)}}
            onKeyDown={e => {if(e.code === "Enter") handleEnter()}}
        />
    </>)
}

export default InputBox