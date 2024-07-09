import { useState } from 'react'


const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)
    }

    return (
        <form className="signin" onSubmit={handleSubmit}>
            <h3>Sign in</h3>

            <label>Email: </label> <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/> 

            <label>Password: </label> <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

            <button>Sign In</button> 
        </form>
    )
}

export default Signin