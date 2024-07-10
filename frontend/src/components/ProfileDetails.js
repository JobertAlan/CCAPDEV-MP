const ProfileDetails = ({ profile }) => {
    return (
        <div className="profile-details">
            <h4>{profile.firstName} {profile.lastName}</h4>
            <p><strong>Email: </strong>{profile.email}</p>
            <p><strong>Password: </strong>{profile.password}</p>
            <p><strong>Is Owner?: </strong>{profile.isOwner}</p>
            <p><strong>_id: </strong>{profile._id}</p>


        </div>
    )
}

export default ProfileDetails