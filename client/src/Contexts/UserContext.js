import React, { useEffect } from "react";
import { createContext, useState } from "react";
import {useMediaQuery} from '@react-hook/media-query'
import usersAPI from "../apis/usersAPI";
import bcrypt from 'bcryptjs'
import io from "socket.io-client"

console.log(process.env.REACT_APP_SOCKET_SERVER_ADDRESS)
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER_ADDRESS)

export const UserContext = createContext({})


export const UserContextProvider = ({children}) => {
    const [userID, setUserID] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [friends, setFriends] = useState([])
    const onMobile = useMediaQuery('only screen and (hover:none)')

    
    
    const updateFriends = async ()=>{
        try {
            const res = await usersAPI.get("/user", {params:{_id:userID}})
            console.log(res.data)   
            if(res.status === 200){
                setFriends(res.data.friends)
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    const logIn = async (inputUsername) => {
        if(!inputUsername){
            return null
        }
        try{
            // get user data
            const user = await usersAPI.get("/user",{params:{
                username:inputUsername},
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }
            })
       
            console.log(user.data)
            
            socket.emit("login", {userID:user.data._id})
            socket.on("login", res => {
            if(res.status === 200){
                setLoggedIn(true)
                setFriends(user.data.friends)
                setUserID(user.data._id)
                setUsername(user.data.username)
            }else{
                alert(res.error)
            }
        })
           
            
        }catch(error){
            console.log(error)
        }
        
    }
  
    const signUp = async () => {
        try{
            const usersWithName = (await usersAPI.get("/auth", {params:{username:username}})).data
            console.log(usersWithName)
            if(usersWithName.user){
                alert("user already exists")
            }else{
                const res = await usersAPI.post("/auth", {email:email, username:username, password:await bcrypt.hash(password, 10)})
                console.log(res)
                return res.status
            } 
        }catch(error){
            console.log(error)
        }
    }

    const value = {
        userID, setUserID,
        username, setUsername,
        friends, setFriends, updateFriends,
        email, setEmail, 
        password, setPassword,
        loggedIn, setLoggedIn,
        logIn, signUp,
        socket, onMobile
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}