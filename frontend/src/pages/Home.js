import { useEffect, useState } from 'react'

// Import from components folder
import UserDetails from '../components/UserDetails'


const Home = () => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/user')
            const json = await response.json()

            if (response.ok) {
                setUsers(json)
            }
        }

        fetchUsers()
    }, [])
    
    return(
        <div className="home">
            <div className='users'>
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))}
            </div>
        </div>
    )
}

export default Home