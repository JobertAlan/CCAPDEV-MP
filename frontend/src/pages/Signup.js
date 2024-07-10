import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

import '../styles/loginsignup.css'

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
        <div className="formsignup">
                <div className="form-content">
                    <header>Signup</header>

                    <form className="signup" onSubmit={handleSubmit}>
                        <div className="field input">
                            <input type="email" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <div className="field input">
                            <input type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        <div className='field input'>
                            <input type="text" placeholder="First Name" className="input" onChange={(e) => setFname(e.target.value)} value={firstName} />
                        </div>

                        <div className='field input'>
                            <input type="text" placeholder="Last Name" className="input" onChange={(e) => setLname(e.target.value)} value={lastName} />
                        </div>


                        <div className="field button">
                            <button disabled={isLoading}>Signup</button>
                        </div>

                        <div className="form-link">
                            <span>Already have an account? <a href="/signin" className="signin">Signin</a></span>
                        </div>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
            </div>
    )
}

export default Signup