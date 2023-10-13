import React, { useContext, useEffect, useState } from "react"
import "../../App.css"
import "./Chat.css"
import { UserContext } from "../../Contexts/UserContext"
const Chat = (props) => {
    const {message, messages} = props 
    const [date, setDate] = useState(new Date(message.timeSent))
    const [timeDisplay, setTimeDisplay] = useState()
    const [usernameStyle, setUsernameStyle] = useState({})
    const {userID} = useContext(UserContext)

    useEffect(() => {
       
       if(message.sentFrom === userID || !message.sentFrom){
        setUsernameStyle({color:"#3b82f5"})
       }else{
        setUsernameStyle({color:"#f53b3b"})
       }
       setDate(new Date(message.timeSent))

    }, [messages])

    useEffect(() => {
        setTimeDisplay(() => {
            let newTimeDisplay = date.getDate() + "/" + (date.getMonth()+1) + " "
            if(date.getHours() > 9){
                newTimeDisplay += date.getHours()
            }else{
                newTimeDisplay += "0" + date.getHours().toString()
            }
            newTimeDisplay += ":"
            if(date.getMinutes() > 9){
                newTimeDisplay += date.getMinutes()
            }else{
                newTimeDisplay += "0" + date.getMinutes().toString()
            }
            return newTimeDisplay
        })
    }, [date])

    return(<>
        <div className="Chat">
            <div className="header">
                <p className="username" style={usernameStyle}>{message.username}</p>
                <p className="time" >{timeDisplay}</p>
            </div>
            <div className="mainBody"> 
                <p>{message.body}</p>        
            </div>
        </div>
    </>)
}

export default Chat