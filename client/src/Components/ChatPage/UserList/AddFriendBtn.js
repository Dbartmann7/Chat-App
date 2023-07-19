import React from "react";
import "./AddFriendBtn.css"
import {RiUserAddFill} from "react-icons/ri"
const AddFriendBtn = ({username}) => {
    const addFriend = () => {
        
    }
    
    return(
        <div className="AddFriendBtnContainer" data-tooltip="Add Friend">
            <RiUserAddFill className="icon"/>
            <button className="AddFriendBtn"/>
            
        </div>
        
    )
}

export default AddFriendBtn