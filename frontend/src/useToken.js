import { useState } from 'react'

const useToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.id
    }
    const [token, setToken] = useState(getToken());

    //set token in session storage
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken)
    }
    return {
        setToken: saveToken,
        token
    }
}

export default useToken