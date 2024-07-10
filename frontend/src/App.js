import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Pages & Components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'



function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={user ? <Home /> : <Navigate to='/' />}
            />

              <Route 
              path='/signin'
              element={!user ? <Signin /> : <Navigate to='/' />}
            />

              <Route 
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route 
              path='/profile'
              element={user ? <Profile /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
