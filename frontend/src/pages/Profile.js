import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'


import { getUserId } from '../util/getUserId'


import '../styles/user.css'

const Profile = () => {
    const { user } = useAuthContext()

    const userId = getUserId(user.token)

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            console.log('Fetching profile for user ID:', userId);
            const response = await fetch(`/api/user/${userId}`);
            const json = await response.json();
    
            if (!response.ok) {
              throw new Error(json.message || 'Failed to fetch profile');
            }
    
            console.log('Fetched Profile Data:', json);
            setProfile(json);
            setLoading(false);
          } catch (err) {
            console.error('Fetch Profile Error:', err);
            setError(err.message);
            setLoading(false);
          }
        };
    
        fetchProfile();
      }, [userId]);
    
    


      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!profile) {
        return <div>No profile data available</div>;
      }
    
      return (
        // <div>
        //   <h1>{profile.name}</h1>
        //   <p>Email: {profile.email}</p>
          
        // </div>

        // <!-- Main container -->
    <div className="cont">

        {/* <!-- stuff on the left --> */}
        <div className="left-cont">

            {/* <!-- basic info about user --> */}
            <div className="user-info">
                <img src={profile.picturePath} alt="user_pfp" />
                <h2>{profile.firstName} {profile.lastName}</h2>
                <h4>{profile.email}</h4>
                <hr />
                <p>193 reviews</p>
                <p>41 ratings</p>

                {/* <!-- has all the interaction stuff to the user --> */}
                <div className="interact-cont">
                    <button>✉ Message</button>
                    <button>❤︎ Follow</button>
                </div>
            </div>
        </div>

        {/* <!-- stuff on the right --> */}
        <div className="right-cont">
            <h2>Stats</h2>
            <br />
            <div className="stats">
                <div className="stat-num">
                    <h3>41</h3>
                    <p>Updoots</p>
                </div>
            </div>
        </div>
    </div>
      );

}

export default Profile