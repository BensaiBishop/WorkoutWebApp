import { useState } from "react";

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {username, password});
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message)
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
                    </div>
                    <div className="password mb-6">
                        <label htmlFor="password" className="block text-sm leading-6">Password</label>
                        <input type="text" id="password" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-300" 
                        required value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-zinc-900 text-white hover:bg-zinc-700 w-full">
                        <span>Create Account</span>
                    </button>
                </form>
            </div>
        </div>
    )
};

export default RegisterPage