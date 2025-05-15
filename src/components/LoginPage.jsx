import { Link , useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate() // use to nagivate

    useEffect(() => {
        const handleIfNoLocalStorage = () => {
            const accountsData = JSON.parse(localStorage.getItem("Accounts"));

            if (accountsData === null) {
                const defaultAcc = [
                    { id: 1, username: "test", password: "test123" }
                ]
                localStorage.setItem("Accounts", JSON.stringify(defaultAcc));
                alert("Local storage created with default account.");
                return
            } else return console.log("dasdsa")
        }
        handleIfNoLocalStorage()
    }, [])

    const handleLogin = () => {
        const accountsData = JSON.parse(localStorage.getItem("Accounts")) || [];
    
        const matchedUser = accountsData.find(
            (user) => user.username === username.trim() && user.password === password.trim()
        );
    
        if (matchedUser) {

            localStorage.setItem("CurrentUserId", matchedUser.id);
            
            const updatedAccounts = accountsData.map(user =>
                user.id === matchedUser.id ? matchedUser : user
            );
            localStorage.setItem("Accounts", JSON.stringify(updatedAccounts));
    
            navigate("/dashboard");
        } else {
            Swal.fire({
                title: "No user found.",
                text: "It seems that user doesn't exist in our database.",
                icon: "warning"
            });
    
            setUsername("");
            setPassword("");
        }
    };
    


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Log in to Your Tracker</h1>

                <div className="flex flex-col gap-4">
                    <input 
                        type="text"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input 
                        type="password"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button 
                        className="bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded transition"
                        onClick={handleLogin}
                    >
                        Log in
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account? 
                        <Link to="/register" className="text-green-600 ml-1 hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
