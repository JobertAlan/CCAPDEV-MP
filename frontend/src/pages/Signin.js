import { useState } from 'react'
import { useSignin } from '../hooks/useSignin'

import '../styles/loginsignup.css'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signin, isLoading, error} = useSignin()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await signin(email, password)
    }

    return (
        // <form className="signin" onSubmit={handleSubmit}>
        //     <h3>Sign in</h3>

        //     <label>Email: </label> <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/> 

        //     <label>Password: </label> <input type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

        //     <button disabled={isLoading}>Sign In</button> 
        //     {error && <div className='error'>{error}</div>}
        // </form>

        <div className="formsignin">
                <div className="form-content">
                    <header>Signin</header>

                    <form className="signup" onSubmit={handleSubmit}>
                        <div className="field input">
                            <input type="email" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <div className="field input">
                            <input type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>


                        <div className="field button">
                            <button disabled={isLoading}>Signin</button>
                        </div>

                        <div className="form-link">
                            <span>Don't have an account? <a href="/signup" className="signup">Signup</a></span>
                        </div>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
            </div>
    )
}

export default Signin