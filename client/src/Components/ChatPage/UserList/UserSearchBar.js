import React, { useEffect } from "react"
import "./Dashboard.css"
import { AiOutlineSearch } from "react-icons/ai"
const UserSearchBar = (props) => {
    const {userToSearch, setUserToSearch, searchUser, setCurrentDisplay} = props
    
    const handleClick = () => {
        searchUser()
        setCurrentDisplay(1)
    }

    return(
     
        <div className="searchContainer">
            <input className="ChatPageInput"
                value={userToSearch}
                placeholder="Search User..."
                onChange={(e) => {
                    setUserToSearch(e.target.value)
                }}
            />
            <div className="searchBtnContainer">
                <AiOutlineSearch className="searchIcon"/>
                <button className="searchBtn" onClick={handleClick}/>
            </div>
        </div>
       
    )
}

export default UserSearchBar