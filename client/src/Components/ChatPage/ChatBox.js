import React, { useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import axios from "axios"
import chatsAPI from "../../apis/chatsAPI"
import SendChatBtn from "./SendChatBtn"
import InputBox from "./InputBox"
import ChatsDisplay from "./ChatsDisplay"
import "./ChatBox.css"
import "./messageBox.css"
import { UserContext } from "../../Contexts/UserContext"
import ImageBtn from "./ImageButton"
import ImagePreview from "./ImagePreview"

const socket = io.connect("http://localhost:8000")
const ChatBox = (props) => {
    const [message, setMessage] = useState({body:"", imgURL:null})
    const [imgToSend, setImgToSend] = useState(null)
    const [messages, setMessages] = useState([])
    const {username} = useContext(UserContext) 
    useEffect(() => {
        getMessages()
    }, [])
    useEffect(() => {
        if(imgToSend){
            setMessage(prevMessage => {
                let newMessage = {...prevMessage}
                newMessage.imgURL = URL.createObjectURL(imgToSend)
                return newMessage
            })
        }else{
            setMessage(prevMessage => {
                let newMessage = {...prevMessage}
                newMessage.imgURL = null
                return newMessage
            })
        }
    }, [imgToSend])
    const sendMessage = async () => {
        console.log(`sending message: ${message}`)
        try {
            setMessage(prevMessage => {
                let newMessage = {...prevMessage}
                newMessage.body = ""
                return newMessage
            })
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
            {message.imgURL ?<ImagePreview imgToSend={imgToSend} imgURL={message.imgURL}/>:null}
            <div className="MessageBtns">
                <ImageBtn
                    imgToSend={imgToSend}
                    setImgToSend={setImgToSend}
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