import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

// Import from components folder



const Home = () => {
    const { user } = useAuthContext()

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