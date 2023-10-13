import React,  {useContext, useEffect, useRef, useState} from "react"
import { UserContext } from "../../Contexts/UserContext";
import "./UserLogin.css"
import UserInput from "./UserInput";
import Button from "../Button";
const LogInPage = (props) => {
    const {username, setUsername, password, setPassword, logIn} = useContext(UserContext)
    const {setShowLogIn} = props 

    return (
        <div className='logInPage'>
            <h1 className="AuthTitle">Log In</h1>
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
            <div className="buttons">
                <Button className="authBtn" displayText={"Sign Up"} clickFunction={() => {setShowLogIn(0)}}/>
                <Button className="authBtn" displayText={"Login"} clickFunction={logIn}/>
            </div>
        </div>
    );
}

export default LogInPage;
