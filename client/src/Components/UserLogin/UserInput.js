import React from "react";
import { validStyle, invalidStyle } from "./ValidationStyles";
import ValidationTick from "./ValidationTick";
import ValidationCross from "./ValidationCross";
const UserInput = (props) => {
    const {state, stateType, setState, inputType, validationFunc} = props

    return(
        <>
            <h2>{stateType}</h2>
                <div className="inputBox">
                <input className="authInput"
                    type={inputType}
                    value={state}
                    onChange={(e) => {
                            setState(e.target.value)
                        }
                    }
                    style={validationFunc ? (validationFunc() ? validStyle:invalidStyle): null}
                />
                {validationFunc? (validationFunc() ? <ValidationTick/>: <ValidationCross/>):null}
                </div>
        
        </>
    )
}

export default UserInput