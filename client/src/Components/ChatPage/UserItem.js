import React from "react";
import "./UserItem.css"

const UserItem = ({user})=>{
    return(
        <div className="UserItem">
            <div className="UserItemHeader">
                <h2 className="username">{user.username}</h2>
            </div>
    
        </div>
    )
}

export default UserItem