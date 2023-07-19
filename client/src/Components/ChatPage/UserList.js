import React, { useEffect, useState } from "react"
import usersAPI from "../../apis/usersAPI"
import "./UserList.css"
import UserSearchBar from "./UserSearchBar"
import UserItem from "./UserItem"
import SearchedUser from "./SearchedUsers"
const UserList = () => {
    const [userToSearch, setUserToSearch] = useState('')
    const [searchedUser, setSearchedUser] = useState({})
    useEffect(()=>{
        console.log(searchedUser)
    }, [searchedUser])
    const searchUser = async () =>{
        try {
            const res = await usersAPI.get("/", {params:{username:userToSearch}})
            if(res.status===200){
                setSearchedUser(res.data)
                console.log(res.data)
            }
        } catch (error) {
            console.log(error)
        }   
        
    }

    return(
        <div className="UserListContainer">
            <UserSearchBar
                userToSearch={userToSearch}
                setUserToSearch={setUserToSearch}
                searchUser={searchUser}
            />
            {searchedUser.username ? <UserItem user={searchedUser}/>: null}
        </div>
    )
}

export default UserList