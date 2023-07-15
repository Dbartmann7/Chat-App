import React from "react"
import {FaRegImage} from "react-icons/fa"
import "./SendChatBtn.css"
const ImageBtn = (props) => {
    
    const handleClick = () => {

    }
    
    return(<>
        <div className="BtnContainer">
            <FaRegImage className="MessageIcon"/>
            <button className="MessageBtn" type="Submit" onClick={handleClick}/>
        </div>
    </>)
}

export default ImageBtn