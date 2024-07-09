import { useState } from "react"

const UserForm = () => {
    // User states
    const [firstName, setFname] = useState('')
    const [lastName, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPword] = useState('')
    const [isOwner, setOwner] = useState('')
    
    return (
        <form className="create">
            <h3>Create an Account</h3>

            <label>First Name: </label> <input type="text" onChange={(e) => setFname(e.target.value)} value={fName}/>
        </form>
    )
}