import { useState } from "react";

const SigninPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');


    const handleSignin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signin', {username, password});
            setToken(response.data.token);
            setMessage('Login successful');
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }

    return (
        <div>
            <div className=" relative flex flex-1 flex-col items-center justify-center pb-16 pt-14">
                <img src="/th.png" alt="hampter" className=" rounded-full"/>
                <form action="submit" onSubmit={handleSignin} className="w-full max-w-sm">
                    <div className="username mb-6 mt-6">
                        <label htmlFor="username" className="block text-sm leading-6">Username</label>
                        <input type="text" id="username" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-300" required value={username}/>
                    </div>
                    <div className="password mb-6">
                        <label htmlFor="password" className="block text-sm leading-6">Password</label>
                        <input type="text" id="password" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-300" required value={password}/>
                    </div>
                    <button type="submit" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-zinc-900 text-white hover:bg-zinc-700 w-full">
                        <span>Sign in to account</span>
                    </button>
                </form>
                <p className="mt-8 text-center">
                    <a href="/password/reset" className="text-sm hover:underline">Forgot password?</a>
                </p>
            </div>
            <footer className="relative shrink-0 text-white">
                <div className="space-y-4 text-sm sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
                    <p className="text-center sm:text-left">Don't have an account?</p>
                    <a href="/register" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 ring-1 ring-zinc-400 hover:ring-zinc-100">
                        <span> Register Now</span>
                    </a>
                </div>
            </footer>
        </div>
    )
};

export default SigninPage