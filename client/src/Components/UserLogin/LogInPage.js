import React,  {useContext, useEffect, useRef, useState} from "react"
import { UserContext } from "../../Contexts/UserContext";
import "./UserLogin.css"
import UserInput from "./UserInput";
import Button from "../Button";
import { IoInformationCircleOutline } from "react-icons/io5";
import ProfileItem from "./ProfileItem/ProfileItem";
import { profiles } from "./Profiles/profiles";


const LogInPage = (props) => {
    const {username, setUsername, password, setPassword, logIn} = useContext(UserContext)
   

    function clickFn(username){
        logIn(username)
    }
    return (
        <div className='logInPage'>
             <header className="log-in-header">
                <h1 className="AuthTitle">Log In</h1>
            </header>
            <div className="AuthInputsContainer">
                <div className="AuthInputs">
                    <UserInput
                        inputType="text"
                        state={username}
                        stateType="Username"
                        setState={setUsername}
                    />
                    <UserInput
                        inputType="password"
                        state={password}
                        stateType="Password"
                        setState={setPassword}
                    />
                </div>
            </div>
        
            <div className="seperation-line"/>
            <h1 className="demo-header">Demo Accounts</h1>
            <div className="profiles">
                
                {
                    profiles.map((profile => {
                        return <ProfileItem username={profile.username} imgSrc={profile.imgSrc} clickFn={clickFn}/>
                    }))
                }
            </div>
        </div>
    );
}

export default LogInPage;
