import { Link } from 'react-router-dom'
import { useSignout } from '../hooks/useSignout'

// css import
import '../styles/navbar.css'

// import local images

const Navbar = () => {

    const { signout } = useSignout()

    const handleSignOut = () => {   // Logic that is applied to an onClick on a button to log a user out
        signout()
    }


    return (
        <header>
            {/* <div className="container">
                <Link to="/">
                    <h2>Cafe review site</h2>
                </Link>
            </div> */}

            {/* <!-- Top bar containing Logo + search --> */}
                <div id="nav-logo-search">
                    <div id="nav-logo-search-container">
                        <div id="logo-container">
                            <a href="index" id="logo-anchor"><img src={`./assets/images/ph-logo.jpg`}/><h1>Yappuccino</h1></a>
                        </div>
                        <div id="search-container">
                            <form>
                                <div id="search-bar">
                                    <span class="material-symbols-outlined">Search</span>
                                    <input class="search-input" type="search" placeholder="Vibe check" />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* <!-- Bottom nav containing links --> */}
                    <nav>
                        <div id="nav-links">
                            <a href="index"><i class="fa fa-home"></i> Home</a>
                            <a href="cafe"><i class="fa fa-search"></i> Cafés</a>
                            {/* <!-- <a href="#Reviews"><i class="fa fa-coffee"></i> Reviews</a> --> */}
                        </div>
                        <div id="button-container">
                            <a href=""><button><i class="fa fa-pencil" aria-hidden="true"></i> Glaze a Café</button></a>
                            <a href="login"><button><i class="fa fa-sign-in"></i> Start Yapping</button></a>
                        </div>
                    </nav>
                </div>
                    </header>
    )
}

export default Navbar