import React, { useContext, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@react-hook/media-query"
import usersAPI from "../../../apis/usersAPI"
import "./Dashboard.css"
import UserSearchBar from "./UserSearchBar"
import { UserContext } from "../../../Contexts/UserContext"
import UserList from "./UserList"
import DashboardNav from "./DashboardNav"
import Button from "../../Button"
import {RxHamburgerMenu} from "react-icons/rx"

const Dashboard = ({setToUser, showDashboard, setShowDashboard}) => {

    

    const {friends} = useContext(UserContext) 

    const [userToSearch, setUserToSearch] = useState('')
    const [searchedUser, setSearchedUser] = useState([])

    const [currentDisplay, setCurrentDisplay] = useState(0)
    
    const dashboardRef = useRef()
    const {onMobile} = useContext(UserContext)
    
    useEffect(() => {
        if(onMobile){
            showDashboard ? dashboardRef.current.style.display = "flex": dashboardRef.current.style.display = "none"
        }
        
    }, [showDashboard])
    useEffect(() => {
        if(!onMobile){
            dashboardRef.current.style.display = "flex"
        }else{
            showDashboard ? dashboardRef.current.style.display = "flex": dashboardRef.current.style.display = "none"
        }
        
    }, [onMobile])
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
        <div className="DashboardContainer" ref={dashboardRef}>
            <div className="DashboardHeader">
                <UserSearchBar
                    userToSearch={userToSearch}
                    setUserToSearch={setUserToSearch}
                    searchUser={searchUser}
                    setCurrentDisplay={setCurrentDisplay}
                />
                <Button style={{width:"40px", height:"40px"}} className={"ToggleDashboardBtn"} Icon={RxHamburgerMenu} iconClassName={"CloseDashboardIcon"} clickFunction={() => {setShowDashboard(false)}}/>
            </div>
            {currentDisplay === 0 ? <UserList title="Friends List" users={friends} setToUser={setToUser} currentDisplay={currentDisplay} setShowDashboard={setShowDashboard}/>:
                            <UserList title="Search Users" users={searchedUser}  setToUser={setToUser} currentDisplay={currentDisplay} setShowDashboard={setShowDashboard}/> }
            
            <DashboardNav 
                setCurrentDisplay={setCurrentDisplay}    
            /> 
        </div>
    )
}

export default Dashboard