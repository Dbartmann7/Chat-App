import React,  {useContext, useEffect, useState} from "react"
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage"
import "./UserLogin.css"
import { UserContext } from "../../Contexts/UserContext";
import InfoPopUp from "./InfoPopUp";
function UserLoginPage() {
    const [showLogIn, setShowLogIn] = useState(true)
    const [showInfo, setShowInfo] = useState(false)
    const {username, email, password} = useContext(UserContext)


    const validateEmail = () => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        
        return regex.test(email)
    }
    const validateUsername = () => {
        if(username.length<1 || username.length > 16){
            return false
        }
        return true
    }
    const validatePassword = () => {
        if(password.length<1){
            return false
        }
        return true
    }

    const validationFunctions = {
        validateEmail:validateEmail,
        validateUsername:validateUsername,
        validatePassword:validatePassword
    }
    return (
        <div className='userLoginPage'>
            {showInfo ? <InfoPopUp setShowInfo={setShowInfo}/>:null}
            {showLogIn ? <LogInPage 
            setShowLogIn={setShowLogIn} setShowInfo={setShowInfo}/>: 
            <SignUpPage setShowLogIn={setShowLogIn} validationFunctions={validationFunctions} setShowInfo={setShowInfo}/>}       
        </div>
    );
}

export default UserLoginPage;
