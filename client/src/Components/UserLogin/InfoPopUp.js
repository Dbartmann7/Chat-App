import React from "react"
import Button from "../Button";
import "./InfoPopUp.css"
const InfoPopUp = ({setShowInfo}) => {
 

    return (
        <div className='InfoPopUp'>
            <div className="InfoPopUpInner">
            <Button className={"InfoCloseBtn"} displayText={"Close"} clickFunction={() => {setShowInfo(false)}}/>
            <h3>Test Accounts</h3>
                <p>Username: test1 | Password:test</p>
                <p>Username: test2 | Password:test</p>
            </div>
        </div>
    );
}

export default InfoPopUp;
{/* <div className="profiles">
                {
                    profiles.map((profile => {
                        return <ProfileItem username={profile.username} imgSrc={profile.imgSrc} clickFn={clickFn}/>
                    }))
                }
            </div> */}