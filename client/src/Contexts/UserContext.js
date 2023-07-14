import React from "react";
import { createContext, useState } from "react";
import usersAPI from "../apis/usersAPI";
import bcrypt from 'bcryptjs'
export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const logIn = async () => {
        try{
            console.log(password)
            // get user data
            const res = await usersAPI.get("/auth",{params:{
                username:username}
            })
            console.log(res)
            if(res.data.length === 0) {
                alert("user doesn't exist")
                return
            }

            if(await bcrypt.compare(password, res.data.password)){
                setLoggedIn(true)
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

            if(usersWithName){
                alert("user already exists")
            }else{
                const res = await usersAPI.post("/auth", {email:email, username:username, password:await bcrypt.hash(password, 10)})
                console.log(res)
            } 
        }catch(error){
            console.log(error)
        }
    }

    const value = {
        username, setUsername,
        email, setEmail, 
        password, setPassword,
        loggedIn, setLoggedIn,
        logIn, signUp
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}