import React, { useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import chatsAPI from "../../apis/chatsAPI"
import SendChatBtn from "./SendChatBtn"
import InputBox from "./InputBox"
import ChatsDisplay from "./ChatsDisplay"
import "./ChatBox.css"
import "./messageBox.css"
import { UserContext } from "../../Contexts/UserContext"
import ImageBtn from "./ImageButton"
import ImagePreview from "./ImagePreview"


const ChatBox = ({toUser}) => {
    const [message, setMessage] = useState({body:"", imgURL:null})
    const [imgToSend, setImgToSend] = useState(null)
    const [messages, setMessages] = useState([])
    const {username, userID, socket} = useContext(UserContext) 
    const [newMessage, setNewMessage] = useState({sentFrom:""})
    useEffect(() => {
        console.log(toUser._id)
        if(toUser){
            getMessages()
        }
    }, [toUser])
    useEffect(() => {
        if(newMessage.sentFrom === toUser._id){
            setMessages(prevMessages => {
                return [...prevMessages, newMessage]
            })
        }
    }, [newMessage])
    useEffect(() => {
        socket.on("newChat",(chat) => {
            setNewMessage(chat)
        })
      
    }, [])
    useEffect(() => {
        console.log(messages)
    }, [messages])
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
    const addMessage = (message) => {
        setMessages(prevMessages => {
            return [...prevMessages, message]
        })
    } 
    useEffect(() => {
        console.log(Date.now())
        const postMessage = async ()=>{
            if(message.timeSent){
                const res = await chatsAPI.post("/", {message:message, sentFrom:userID, toUser:toUser._id})
                if(res.status === 200){
                    addMessage(message)
                    console.log(toUser._id)
                    socket.emit("newChat", {message:message, sentFrom:userID, toUser:toUser._id})  
                    resetChat()
                }else{
                    alert("problem sending message")
                }
            }
        }

        postMessage()
        
    }, [message.timeSent])
    const sendMessage = async () => {
        console.log(message)
        console.log(toUser._id)
        setMessage(prevMessage => {
            let newMessage = {...prevMessage}
            newMessage.timeSent =  Date.now()
            newMessage.username = username
            return newMessage
        })
    }
    const resetChat = () => {
        setMessage(prevMessage => {
            let newMessage = {...prevMessage}
            newMessage.timeSent =  null
            newMessage.body=""
            return newMessage
        })
    }
    
    const getMessages = async () => {
        try{
            console.log(`getting messages from ${username} to ${toUser.username}`)
            const res = await chatsAPI.get("/", {params: {sentFrom:userID, toUser:toUser._id}})
            console.log(res)
            setMessages(res.data)
        }catch(error){
            console.log(error)
        }
    }
    
    return(<div className="chatBoxContainer">
        <ChatsDisplay
            toUser={toUser}
            clientID={username}
            messages={messages}
        />
        <div className="messageBox">
            <InputBox 
                toUser={toUser}
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