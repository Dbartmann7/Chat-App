import React, { useEffect, useState } from "react"
import {BsSendFill} from "react-icons/bs"
import "./SendChatBtn.css"
const SendChatBtn = (props) => {
    const {message, sendMessage} = props
    
    const handleClick = () => {

        if(message.body.length > 0) {
            sendMessage()
        }
        
    }
    
    return(<>
        <div className="BtnContainer">
            <BsSendFill className="MessageIcon"/>
            <button className="MessageBtn" type="Submit" onClick={handleClick}/>
        </div>
    </>)
}

export default SendChatBtn