import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFname] = useState('')
    const [lastName, setLname] = useState('')
    const {signup, isLoading, error} = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password, firstName, lastName)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email: </label> <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/> 

            <label>Password: </label> <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

            <label>First Name: </label> <input type='text' onChange={(e) => setFname(e.target.value)} value={firstName}/> 

            <label>Last Name: </label> <input type='text' onChange={(e) => setLname(e.target.value)} value={lastName}/>

            <button disabled={isLoading}>Sign Up</button> 
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup