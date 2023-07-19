import React, { useContext, useEffect, useState } from "react"
import usersAPI from "../../../apis/usersAPI"
import "./Dashboard.css"
import UserSearchBar from "./UserSearchBar"
import { UserContext } from "../../../Contexts/UserContext"
import UserList from "./UserList"
const Dashboard = () => {
    const {friends} = useContext(UserContext) 

    const [userToSearch, setUserToSearch] = useState('')
    const [searchedUser, setSearchedUser] = useState(null)
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
        <div className="DashboardContainer">
            <UserSearchBar
                userToSearch={userToSearch}
                setUserToSearch={setUserToSearch}
                searchUser={searchUser}
            />
            {searchedUser ? <UserList users={[searchedUser]} title={"Searched User"}/> : null}
            <UserList users={friends} title="Friends List"/>
        </div>
    )
}

export default Dashboard