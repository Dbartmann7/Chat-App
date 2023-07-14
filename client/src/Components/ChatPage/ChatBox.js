import React, { useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import axios from "axios"
import chatsAPI from "../../apis/chatsAPI"
import SendChatBtn from "./SendChatBtn"
import InputBox from "./InputBox"
import ChatsDisplay from "./ChatsDisplay"
import "./ChatBox.css"
import { UserContext } from "../../Contexts/UserContext"

const socket = io.connect("http://localhost:8000")
const ChatBox = (props) => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const {username} = useContext(UserContext) 
    useEffect(() => {
        getMessages()
    }, [])

    const sendMessage = async () => {
        console.log(`sending message: ${message}`)
        try {
            setMessage("")
            const res = await chatsAPI.post("/", {message:message, username:username})
        } catch (error) {
            console.log(error)
        }
    }

    const getMessages = async () => {
        try{
            const res = await chatsAPI.get("/")
            setMessages(res.data)
        }catch(error){
            console.log(error)
        }
    }
    socket.on("newChat", (chat) => {

        setMessages([...messages, chat])
    })

    socket.on("chatDeleted", () => {
        getMessages()
    })
    return(<div className="chatBoxContainer">
        <ChatsDisplay
            clientID={username}
            messages={messages}
        />
        <div className="messageBox">
            <InputBox 
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
            <div className="MessageBtns">
                <SendChatBtn 
                    message={message}
                    sendMessage={sendMessage}
                />
                <SendChatBtn 
                    message={message}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
        
    </div>)
}

export default ChatBox