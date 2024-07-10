import { isExpired, decodeToken } from 'react-jwt'

export const getUserId = (token) => {
    if (isExpired(token)) {
        throw Error("Session expired. Please signin again.")
    }
    const decodedToken = decodeToken(token)

    return decodedToken._id
}