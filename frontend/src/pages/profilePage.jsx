import { useEffect, useState } from "react";


export default function ProfilePage() {

    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    },[]);

    return (
        <div>
            {username}
        </div>
    )
};

