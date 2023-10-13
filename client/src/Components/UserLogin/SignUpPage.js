import React,  {useContext, useEffect} from "react"
import { UserContext } from "../../Contexts/UserContext";
import Button from "../Button";
import "./UserLogin.css"
import UserInput from "./UserInput";
import usersAPI from "../../apis/usersAPI";

function SignUpPage( props) {
    const {username, setUsername, email, setEmail, password, setPassword, signUp} = useContext(UserContext)
    const {setShowLogIn, validationFunctions} = props
    const createAccount = async () => {
        const result = await signUp()
  
        if(result === 200){
            alert("account created")
            setShowLogIn(1)
        }
    }
    return (
        <div className='signUpPage'>
            <h1 className="AuthTitle">Create An Account</h1>
            <div className="AuthInputsContainer">
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
                    
                </div>
            </div>
            <div className="buttons">
                <Button className="authBtn" displayText={"Login"} clickFunction={() => {setShowLogIn(1)}}/>
                <Button className="authBtn" displayText={"Create Account"} clickFunction={createAccount}/>
            </div>
        </div>
    );
}

export default SignUpPage;
