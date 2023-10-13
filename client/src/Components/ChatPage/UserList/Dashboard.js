import React, { useContext, useEffect, useRef, useState } from "react"
import usersAPI from "../../../apis/usersAPI"
import "./Dashboard.css"
import UserSearchBar from "./UserSearchBar"
import { UserContext } from "../../../Contexts/UserContext"
import UserList from "./UserList"
import DashboardNav from "./DashboardNav"
import Button from "../../Button"
import {RxHamburgerMenu} from "react-icons/rx"

const Dashboard = ({setToUser, setShowDashboard}) => {

    

    const {friends} = useContext(UserContext) 

    const [userToSearch, setUserToSearch] = useState('')
    const [searchedUser, setSearchedUser] = useState([])

    const [currentDisplay, setCurrentDisplay] = useState(0)
    


    const searchUser = async () =>{
        
        try {
            console.log("Searching user...")
            const res = await usersAPI.get("/", {params:{username:userToSearch}})
            if(res.status===200){
                setSearchedUser([res.data])
                console.log(res.data)
            }
        } catch (error) {
            console.log(error)
        }   
        
    }
    
    return(
        <div className="DashboardContainer">
            <div className="DashboardHeader">
                <UserSearchBar
                    userToSearch={userToSearch}
                    setUserToSearch={setUserToSearch}
                    searchUser={searchUser}
                    setCurrentDisplay={setCurrentDisplay}
                />
                <Button style={{width:"40px", height:"40px"}} className={"ToggleDashboardBtn"} Icon={RxHamburgerMenu} iconClassName={"CloseDashboardIcon"} clickFunction={() => {setShowDashboard(false)}}/>
            </div>
            {currentDisplay === 0 ? <UserList title="Friends List" users={friends} setToUser={setToUser} currentDisplay={currentDisplay}/>:
                            <UserList title="Search Users" users={searchedUser}  setToUser={setToUser} currentDisplay={currentDisplay}/> }
            
            <DashboardNav 
                setCurrentDisplay={setCurrentDisplay}    
            /> 
        </div>
    )
}

export default Dashboard