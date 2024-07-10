import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'


// Import from components 
import { getUserId } from '../util/getUserId'

const Home = () => {
    const { user } = useAuthContext()

     const userId = getUserId(user.token)

    //  const token = user.token
    //  const decodedToken = decodeToken(token)
    //  const userId = decodedToken._id

    // This connects to the db and returns all user information
    // const [users, setUsers] = useState(null)

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const response = await fetch('/api/user')
    //         const json = await response.json()

    //         if (response.ok) {
    //             setUsers(json)
    //         }
    //     }

    //     fetchUsers()
    // }, [])

    

    return(
        <div className="home">
            
        </div>
    )
}

export default Home