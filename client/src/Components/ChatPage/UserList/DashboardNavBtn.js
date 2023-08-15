import React from "react";
import "./DashboardNavBtn.css"
const DashboardNavBtn = ({Icon, showDisplay}) => {
    
    const handleClick = () =>{
        console.log("clicked")
        showDisplay()
    }

    return(
        <div className="DashboardNavBtnContainer">
            <button className="DashboardNavBtn" onClick={handleClick} />
            <Icon className="DashboardNavBtnIcon"/>
        </div>
    )

}

export default DashboardNavBtn