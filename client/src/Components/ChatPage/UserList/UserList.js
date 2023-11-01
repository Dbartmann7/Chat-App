import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import "./UserList.css"
const UserList = ({users, title, setToUser, currentDisplay, setShowDashboard}) => {
    const [key, setKey] = useState(0)
    
    // force update userItems to currently show if user is a friend
    useEffect(() => {
        setKey(key+1)
    }, [users, title,currentDisplay])
    
    return(
        <div className="UserListContainer" key={key}>
            <h1 className="title">{title}</h1>
            
            {users.length>0 ? 
            
                <ul className="scrollable">
                {users.map((user, i) => {
                    return <UserItem key={i} user={user} setToUser={setToUser} currentDisplay={currentDisplay} setShowDashboard={setShowDashboard}/>
                        
                })}
            
                </ul>:

                <h1>none</h1>
                
            }
            
        </div>
    )

}

export default UserList
