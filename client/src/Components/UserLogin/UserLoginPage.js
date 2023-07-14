import React,  {useContext, useEffect, useState} from "react"
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage"
import "./UserLogin.css"
import { UserContext } from "../../Contexts/UserContext";
function UserLoginPage() {
    const [showLogIn, setShowLogIn] = useState(false)
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
            {showLogIn ? <LogInPage 
            setShowLogIn={setShowLogIn}/>: 
            <SignUpPage setShowLogIn={setShowLogIn} validationFunctions={validationFunctions}/>}       
        </div>
    );
}

export default UserLoginPage;
