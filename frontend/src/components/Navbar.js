import { Link } from 'react-router-dom'
import { useSignout } from '../hooks/useSignout'
import { useAuthContext } from '../hooks/useAuthContext'

// css import
import '../styles/navbar.css'

// import local images

const Navbar = () => {

    const { signout } = useSignout()
    const { user } = useAuthContext()

    const handleSignOut = () => {   // Logic that is applied to an onClick on a button to log a user out
        signout()
    }

    

    return (
        <header>
            {/* <!-- Top bar containing Logo + search --> */}
                <div id="nav-logo-search">
                    <div id="nav-logo-search-container">
                        <div id="logo-container">
                            <a href="/" id="logo-anchor"><img src='/assets/images/ph-logo-small.png' alt='picture-of-logo'/><h1>Yappuccino</h1></a>
                        </div>
                        <div id="search-container">
                            <form>
                                <div id="search-bar">
                                    <span className="material-symbols-outlined">Search</span>
                                    <input className="search-input" type="search" placeholder="Vibe check" />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* <!-- Bottom nav containing links --> */}
                    <nav>
                        <div id="nav-links">
                            <a href="/"><i className="fa fa-home"></i> Home</a>
                            <a href="/"><i className="fa fa-search"></i> Cafés</a>
                            {/* <!-- <a href="#Reviews"><i className="fa fa-coffee"></i> Reviews</a> --> */}
                        </div>

                        {/* <button><i className="fa fa-pencil" aria-hidden="true"></i> Glaze a Café</button> */}

                        {user && (
                            <div id="button-container">
                                <Link to='/profile'><button className='user'><i className="fa fa-blind"></i>User: {user.email}</button></Link>
                                <button onClick={handleSignOut}><i className="fa fa-pencil"></i> Stop Cooking</button>
                                
                            </div>
                        )}

                        {!user && (
                            <div id="button-container">
                                <Link to='/signup'><button><i className="fa fa-sign-in"></i> Start Cooking</button></Link>
                                <Link to='/signin'><button><i className="fa fa-cutlery"></i> Keep Cooking</button></Link>
                            </div>
                        )}

                        
                            
                    </nav>
                </div>
                
            </header>

            
    )
}

export default Navbar