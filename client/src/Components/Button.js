import React from "react";
import "./Button.css"
const Button = ({className, style, Icon, displayText, clickFunction}) => {
    
    const handleClick = () =>{
        console.log("clicked")
        clickFunction()
    }

    return(
        <div className={`BtnContainer2 ${className}`} style={style}>
            <button className="Btn" onClick={handleClick} />
            {Icon ? <Icon className="BtnIcon"/>: displayText}
        </div>
    )

}

export default Button