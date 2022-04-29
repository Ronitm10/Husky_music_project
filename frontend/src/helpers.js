import { Navigate } from "react-router-dom";

export function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
}

export function logout() {
    sessionStorage.clear('token');
}