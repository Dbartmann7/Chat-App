import React, { useEffect } from "react"
import "./Dashboard.css"
import { AiOutlineSearch } from "react-icons/ai"
const UserSearchBar = (props) => {
    const {userToSearch, setUserToSearch, searchUser} = props
    
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
                <button className="searchBtn" onClick={searchUser}/>
            </div>
            
        </div>
       
    )
}

export default UserSearchBar