import React,  {useContext, useEffect, useState} from "react"
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage"
import "./UserLogin.css"
import { UserContext } from "../../Contexts/UserContext";
import InfoPopUp from "./InfoPopUp";
function UserLoginPage() {
   
    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className='userLoginPage'>
            {showInfo ? <InfoPopUp setShowInfo={setShowInfo}/> : null}
            <LogInPage setShowInfo={setShowInfo}/>      
        </div>
    );
}

export default UserLoginPage;
