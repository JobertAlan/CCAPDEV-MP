import { useState } from "react"

import '../styles/loginsignup.css'

const UserForm = () => {
    // User states
    const [firstName, setFname] = useState('')
    const [lastName, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPword] = useState('')
    
    return (
        // <form className="create">
        //     <h3>Create an Account</h3>

        //     <label>First Name: </label> <input type="text" onChange={(e) => setFname(e.target.value)} value={fName}/>
        // </form>

        <div className="formsignup">
                <div className="form-content">
                    <header>Signup</header>

                    <form action="#">
                        <div className="field input">
                            <input type="email" placeholder="Email" className="input" />
                        </div>

                        <div className="field input">
                            <input type="password" placeholder="Password" className="input" />
                        </div>

                        <div className="field input">
                            <input type="password" placeholder="Confirm Password" className="input" />
                        </div>

                        <div className="field button">
                            <button>Signup</button>
                        </div>

                        <div className="form-link">
                            <span>Already have an account? <a href="/signin" className="login">Login</a></span>
                        </div>
                    </form>
                </div>
            </div>
        
    )
}