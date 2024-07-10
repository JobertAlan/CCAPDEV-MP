import { createContext, useReducer, useEffect } from 'react'


export const AuthContext = createContext()


export const authReducer = (state, action) => {
    //Signin and Signout
    switch(action.type) {
        case 'LOGIN': return { user: action.payload }

        case 'LOGOUT': return { user: null }

        default: return state
    }
}

// Wrapper: 
export const GetAuthContext = ({ children }) => {  // children is the app component
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user})
        }
    }, []) // Does a check on local machine for a login token to set the login state

    console.log('AuthContext is currently: ', state)

    // Provides context (loginstate) to entire site
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}