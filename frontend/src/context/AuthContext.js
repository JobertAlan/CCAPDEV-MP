import { createContext, useReducer } from 'react'


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

    console.log('AuthContext is currently: ', state)

    // Provides context (loginstate) to entire site
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}