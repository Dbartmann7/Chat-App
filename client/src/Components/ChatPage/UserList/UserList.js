import React from "react";
import UserItem from "./UserItem";
import "./UserList.css"
const UserList = ({users, title}) => {

    return(
        <div className="UserListContainer">
            <h1 className="title">{title}</h1>
            {users.length>0 ? 
                <ul>
                {users.map((user, i) => {
                    return <UserItem key={i} user={user}/>
                        
                })}
                {/* <UserItem key={1} user={{username:"test"}}/>
                <UserItem key={2} user={{username:"test2"}}/>
                <UserItem key={3} user={{username:"test3"}}/> */}
                </ul>:

                <h2>Friends List Empty</h2>
                
            }
            
        </div>
    )

}

export default UserList
