import { useAuthContext } from "./useAuthContext"

export const useSignout = () => {
    const { dispatch } = useAuthContext()

    const signout = () => {
        // removes user from machine
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
    }

    return {signout}
}