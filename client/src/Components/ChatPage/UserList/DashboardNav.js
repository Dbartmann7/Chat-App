import React from "react";
import {FaUserFriends} from "react-icons/fa"
import {RiUserSearchFill} from "react-icons/ri"
import "./DashboardNav.css"
import "./DashboardNavBtn.css"
import DashboardNavBtn from "./DashboardNavBtn";
import Button from "../../Button";
const DashboardNav = ({ setCurrentDisplay}) =>{
    const showFriendList = () => {
        setCurrentDisplay(0)
    }
    const showSearchedUserList = () => {
        setCurrentDisplay(1)
    }

    return(
        <div className="DashboardNavContainer">
            <Button className="DashboardNavBtn"  Icon={RiUserSearchFill} clickFunction={showSearchedUserList} style={{borderRadiusLeft:"25px"}}/>
            <Button className="DashboardNavBtn"  Icon={FaUserFriends} clickFunction={showFriendList}/>
        </div>
    )
}

export default DashboardNav