import React,  {useContext, useEffect} from "react"
import { UserContext } from "../../Contexts/UserContext";
import Button from "../Button";
import "./UserLogin.css"
import UserInput from "./UserInput";
import usersAPI from "../../apis/usersAPI";

function SignUpPage( props) {
    const {username, setUsername, email, setEmail, password, setPassword, signUp} = useContext(UserContext)
    const {setShowLogIn, validationFunctions} = props

    return (
        <div className='signUpPage'>
            <h1 className="AuthTitle">Create An Account</h1>
            <div className="AuthInputs">
                <UserInput
                    inputType="text"
                    state={email}
                    stateType="Email"
                    setState={setEmail}
                    validationFunc={validationFunctions.validateEmail}
                />
                <UserInput
                    inputType="text"
                    state={username}
                    stateType="Username"
                    setState={setUsername}
                    validationFunc={validationFunctions.validateUsername}
                />
                <UserInput
                    inputType="password"
                    state={password}
                    stateType="Password"
                    setState={setPassword}
                    validationFunc={validationFunctions.validatePassword}
                />
                <div className="buttons">
                    <Button className="authBtn" displayText={"SignUp"} clickFunction={signUp}/>
                    <Button className="authBtn" displayText={"Login"} clickFunction={() => {setShowLogIn(1)}}/>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
