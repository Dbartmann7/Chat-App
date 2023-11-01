import React from "react"
import Button from "../Button";
import "./InfoPopUp.css"
const InfoPopUp = ({setShowInfo}) => {
 

    return (
        <div className='InfoPopUp'>
            <div className="InfoPopUpInner">
            <Button className={"InfoCloseBtn"} displayText={"Close"} clickFunction={() => {setShowInfo(false)}}/>
            <h3>Test Accounts</h3>
                <p>Username: test1 | Password:test<br/>Username: test2 | Password:test<br/></p>
            <h3>Skills Used</h3>
                <p>Javacript, Responsive CSS, React, ExpressJS, Socket.io, MongoDB, Mongoose</p>
            </div>
        </div>
    );
}

export default InfoPopUp;
