import './ProfileBtn.css'

const ProfileBtn = (props) => {
    const {clickFn, username, imgSrc} = props

    return (
        <button className="profile-btn" onClick={() => {clickFn(username)}}>
            <img src={imgSrc} className='profile-img' width={80}/>
        </button>
    );
}

export default ProfileBtn;
