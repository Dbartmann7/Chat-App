import React, { useContext, useEffect, useState } from "react";

import "./UserItem.css"
import Button from "../../Button";
import usersAPI from "../../../apis/usersAPI";
import { UserContext } from "../../../Contexts/UserContext";
import {RiUserAddFill, RiUserUnfollowFill} from "react-icons/ri"
import {AiFillMessage} from "react-icons/ai"

const UserItem = ({user, setToUser, setShowDashboard})=>{
    
    const {userID, username, friends} = useContext(UserContext)
    const [isFriend, setIsFriend] = useState(false)
    const {onMobile} = useContext(UserContext)
    useEffect(() => {
        checkFriend()

        return () => {
            checkFriend()
        }
    }, [])
    useEffect(() => {
        checkFriend()
    }, [friends])

    const checkFriend = () => {
        let friend = false
        for(let i=0; i<friends.length; i++){
            if(friends[i]._id === user._id){
                friend = true
                break
            }
        }
        setIsFriend(friend)
    }

    const addFriend = async()=>{
        console.log("adding friend...")
        console.log(user)
        const res = await usersAPI.patch("/friends", {userID:userID, username:username, friendToAdd:user._id, type:"add"})
        console.log(res)
    }
    const removeFriend = async () => {
        console.log("removing friend...")
        const res = await usersAPI.patch("/friends", {userID:userID, username:username, friendToAdd:user._id, type:"remove"})
        console.log(res)
    }

    const openChat = () => {
        setToUser({username:user.username, _id:user._id})
        if(onMobile){
            setShowDashboard(false)
        }
    }
    return(
        <div className="UserItem">
       
            <h2 className="username">{user.username}</h2>
        
            <div className="Buttons">
                {isFriend ? <Button className="UserBtn" Icon={RiUserUnfollowFill} clickFunction={removeFriend}/>:<Button className="UserBtn" Icon={RiUserAddFill} clickFunction={addFriend} />}
                <Button className="UserBtn" Icon={AiFillMessage} clickFunction={openChat} />
            </div>
        </div>
    )
}

export default UserItem