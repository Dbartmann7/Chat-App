import React, { useEffect } from "react"
import {FaRegImage} from "react-icons/fa"
import "./SendChatBtn.css"
const ImageBtn = ({imgToSend, setImgToSend}) => {

    const handleClick = (e) => {
        if(e.target.files[0].type.match("image")){
            console.log(e.target.files[0])
            setImgToSend(e.target.files[0])
        }
    }
    
    return(<>
        <div className="BtnContainer">
            <FaRegImage className="MessageIcon"/>
            <input className="ImageInput" type="file" accept=".png,.jpeg,.jpg,.gif" onChange={handleClick}/>
        </div>
    </>)
}

export default ImageBtn