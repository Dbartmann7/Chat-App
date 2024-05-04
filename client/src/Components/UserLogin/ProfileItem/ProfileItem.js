import ProfileBtn from "./ProfileBtn/ProfileBtn";
import './ProfileItem.css'
const ProfileItem = (props) => {
    const {clickFn, username, imgSrc} = props

    return (
        <div className='profile-item'>
            <h3 className="profile-name">{username}</h3>
            <ProfileBtn clickFn={clickFn} username={username} imgSrc={imgSrc}/>
        </div>
    );
}

export default ProfileItem;
