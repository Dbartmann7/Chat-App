import React from "react";
import "./UserItem.css"
import AddFriendBtn from "./AddFriendBtn";

const UserItem = ({user})=>{
    return(
        <div className="UserItem">
       
            <h2 className="username">{user.username}</h2>
       
            <div className="Buttons">
                <AddFriendBtn username={user.username}/>
                <AddFriendBtn username={user.username}/>
            </div>
        </div>
    )
}

export default UserItem