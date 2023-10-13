import React, { useEffect } from "react";
import { createContext, useState } from "react";
import usersAPI from "../apis/usersAPI";
import bcrypt from 'bcryptjs'
import io from "socket.io-client"
const socket = io.connect("http://localhost:8000")

export const UserContext = createContext({})


export const UserContextProvider = ({children}) => {
    const [userID, setUserID] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [friends, setFriends] = useState([])
    
    const updateFriends = async ()=>{
        try {
            const res = await usersAPI.get("/", {params:{_id:userID}})
            console.log(res.data)   
            if(res.status === 200){
                setFriends(res.data.friends)
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    const logIn = async () => {
        if(!username){
            return null
        }
        try{
            // get user data
            const user = await usersAPI.get("/auth",{params:{
                username:username}
            })
       
            console.log(password)
            if(await bcrypt.compare(password, user.data.user.password)){
                socket.emit("login", {userID:user.data.user._id})
                socket.on("login", res => {
                    if(res.status === 200){
                        setLoggedIn(true)
                        setFriends(user.data.user.friends)
                        setUserID(user.data.user._id)
                    }else{
                        alert(res.error)
                    }
                })
                
            }else{
                alert("wrong password")
            }
            
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
        socket
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}