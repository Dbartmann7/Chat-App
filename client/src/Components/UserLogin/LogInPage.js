import React,  {useContext, useEffect, useRef, useState} from "react"
import { UserContext } from "../../Contexts/UserContext";
import "./UserLogin.css"
import UserInput from "./UserInput";
const LogInPage = (props) => {
    const {username, setUsername, password, setPassword, logIn} = useContext(UserContext)
    const {setShowLogIn} = props 

    return (
        <div className='logInPage'>
            <h1>Log In</h1>
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
            <button onClick={() => logIn()}>
                Log In
            </button>
            <button onClick={() => setShowLogIn(false)}>
                Sign Up
            </button>
        </div>
    );
}

export default LogInPage;
