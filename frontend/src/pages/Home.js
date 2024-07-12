import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'


// Import from components 
import { getUserId } from '../util/getUserId'

const Home = () => {
    const { user } = useAuthContext()

     const userId = getUserId(user.token)

   

    return(
        <div className="home">
        
        </div>
    )
}

export default Home