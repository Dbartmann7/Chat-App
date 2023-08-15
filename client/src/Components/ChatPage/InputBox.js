import React, { useEffect, useState } from "react"

const InputBox = (props) => {
    const {toUser, message, setMessage, sendMessage} = props

    const [inputDisabled, setInputDisabled] = useState(true)

    useEffect(() =>{
        if(toUser._id){
            setInputDisabled(false)
        }else{
            setInputDisabled(true)
        }
        console.log(toUser)
        console.log(inputDisabled)
    }, [toUser])


    
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
            disabled={inputDisabled}
        />
    </>)
}

export default InputBox