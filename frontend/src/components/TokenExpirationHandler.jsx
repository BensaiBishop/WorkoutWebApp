import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";



export default function TokenExpirationHandler() {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            //if token is expired to about to expire in 5 min
            if (expirationTime - currentTime < 5 * 60 * 1000) {
                setIsTokenExpired(true);
            }

            //set interval to check token every min
            const intervalID = setInterval(() => {
                const currentTime = Date.now();
                if (expirationTime -currentTime < 5 * 60 * 1000) {
                    setIsTokenExpired(true);
                }
                if (expirationTime - currentTime <= 0) {
                    handleLogout();
                }
            }, 60 * 1000);
            return () => clearInterval(intervalID);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/signin');
    };

    const handleRenewSession = async() => {
        try {
            const response = await axios.post("http://localhost:3000/api/renewToken", {token});
            const newToken = response.data.token;
            localStorage.setItem("token",newToken)
            setToken(newToken);
            setIsTokenExpired(false);
        } catch (error) {
            console.error("Failed to renew session", error);
            handleLogout();
        }
    };

    useEffect(() => {
        if (isTokenExpired) {
            const userReponse = window.confirm("Your session is about to expire, please renew.")
            if (userReponse) {
                handleRenewSession();
            } else {
                handleLogout();
            }
        }
    }, [isTokenExpired]);

    return null;
}