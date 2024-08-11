import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";



export default function TokenExpirationHandler() {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    
    useEffect(() => {

        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
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

        const checkTokenExpiration = () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                const expirationTime = decodedToken.exp * 1000;
                const currentTime = Date.now();

                if (currentTime >= expirationTime) {
                    handleLogout();
                } else if (expirationTime - currentTime < 5*60*1000) {
                    const userResponse = window.confirm('Your session is about to expire, please renew');
                    if (userResponse) {
                        handleRenewSession();
                    } else {
                        handleLogout();
                    }
                }
            } 
        };

        checkTokenExpiration();

        const intervalID = setInterval(checkTokenExpiration, 60 * 1000);
        return () => clearInterval(intervalID);
    },[token,navigate]);
    
    return null;
}