import { Link } from "react-router-dom";


const LoginPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Log in to Your Tracker</h1>

                <div className="flex flex-col gap-4">
                    <input 
                        type="text"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Username"
                    />

                    <input 
                        type="password"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Password"
                    />

                    <Link 
                        className="bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded transition"
                        to="/dashboard"
                    >
                        Log in
                    </Link>

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
