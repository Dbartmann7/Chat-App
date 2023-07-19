import React from "react";
import UserItem from "./UserList/UserItem";
import "./SearchedUsers.css"
const SearchedUser = ({users})=>{

    return (
        <div className="SearchedUsersContainer">
                <UserItem user={{username:"test"}}/>
        </div>
    )
}

export default SearchedUser