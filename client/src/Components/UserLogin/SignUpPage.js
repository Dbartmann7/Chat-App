import React,  {useContext, useEffect} from "react"
import { UserContext } from "../../Contexts/UserContext";

import "./UserLogin.css"
import UserInput from "./UserInput";
import usersAPI from "../../apis/usersAPI";

function SignUpPage( props) {
    const {username, setUsername, email, setEmail, password, setPassword, signUp} = useContext(UserContext)
    const {setShowLogIn, validationFunctions} = props

    // // useEffect(() => {
    //     usersAPI.post("/friends", {username:"test", friendToAdd:"Daniel"})
    // // }, [])
    return (
        <div className='signUpPage'>
            <h1>Create An Account</h1>
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
                <button onClick={() =>signUp()}>
                    Submit
                </button>
                <button onClick={() => setShowLogIn(true)}>
                    Log In
                </button>
            </div>
        </div>
    );
}

export default SignUpPage;
