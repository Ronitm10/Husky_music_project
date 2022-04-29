import { Navigate } from 'react-router-dom'
import useToken from '../useToken';

const ProtectedRoute = ({ children }) => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log("Entering protected route", userToken);
    if (!userToken) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;