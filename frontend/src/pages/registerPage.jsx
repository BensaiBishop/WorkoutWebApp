import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import debounce from "../utils/debounce";


export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [userNameAvailable, setUserNameAvailable ] = useState(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const checkUserNameAvailability = useCallback(
        debounce(async (username) => {
            try {
                const response = await axios.post('http://localhost:3000/api/checkuserName', {username});
                setUserNameAvailable(response.data.exists ? false : true);
            } catch (error) {
                console.log('Error checking username availability', error);
                setUserNameAvailable(null); // Optionally, set to null to indicate an unknown state
            }
        }, 300), []
    );

    useEffect(() => {
        if (username) {
            checkUserNameAvailability(username);
        } else {
            setUserNameAvailable(null);
        }
    }, [username, checkUserNameAvailability]);

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!userNameAvailable) {
            setMessage('Username is already taken');
            return;
        }
        if (!emailRegex.test(email)) {
            setMessage('Please enter a valid email.')
            return;
        }
        if (!passwordRegex.test(password)) {
            setMessage('Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, and one number.');
            return;
          }
        try {
            const response = await axios.post('http://localhost:3000/api/register', {username, password, email});
            console.log('Response received', response);
            setMessage(response.data.message); 
            navigate('/signin');
        } catch (error) {
            console.log('Error received', error.response);
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div>
            <div className=" relative flex flex-1 flex-col items-center justify-center pb-16 pt-14">
                <label htmlFor="SIGN UP"> You wanna get big kid?</label>
                <form action="submit" onSubmit={handleRegister} className="w-full max-w-sm">
                    <div className="username mb-6 mt-6">
                        <label htmlFor="username" className="block text-sm leading-6">Username</label>
                        <input type="text" id="username" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-300" 
                        required value={username} onChange={(event) => setUsername(event.target.value)}/>
                        {username && (
                            <p className={`mt-2 text-sm ${userNameAvailable === null ? 'text-gray-500' : userNameAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                {userNameAvailable === null ? 'Checking username availability...' : userNameAvailable ? 'Username is available' : 'Username is already taken'}
                            </p>
                        )}
                    </div>
                    <div className="email mb-6">
                        <label htmlFor="email" className="block text-sm leading-6">Email</label>
                        <input type="text" id="email" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-300" 
                        required value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div className="password mb-6">
                        <label htmlFor="password" className="block text-sm leading-6">Password</label>
                        <input type="password" id="password" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-300" 
                        required value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-zinc-900 text-white hover:bg-zinc-700 w-full">
                        <span>Create Account</span>
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    )
};

