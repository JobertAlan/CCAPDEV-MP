const UserDetails = ({ user }) => {
    return (
        <div className="user-details">
            <p><strong>Path: </strong>{user.picturePath}</p>
            <h4>{user.firstName} {user.lastName}</h4>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Password: </strong>{user.password}</p>
            <p><strong>Is Owner?: </strong>{user.isOwner}</p>
            <p><strong>_id: </strong>{user._id}</p>


        </div>
    )
}

export default UserDetails