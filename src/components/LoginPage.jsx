import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accountsData = JSON.parse(localStorage.getItem("Accounts"));

    if (accountsData === null) {
      const defaultAcc = [
        { id: 1, username: "admin", password: "admin" }
      ];
      localStorage.setItem("Accounts", JSON.stringify(defaultAcc));
      alert("Local storage created with default account.");
    }
  }, []);

  const handleLogin = () => {
    const accountsData = JSON.parse(localStorage.getItem("Accounts")) || [];
  
    const matchedUser = accountsData.find(
      (user) =>
        user.username === username.trim() &&
        user.password === password.trim()
    );
  
    if (matchedUser) {
      localStorage.setItem("CurrentUserId", matchedUser.id);
      localStorage.setItem("CurrentUsername", matchedUser.username);
  
      // Check if admin
      if (matchedUser.username.toLowerCase() === "admin") {
        navigate("/admin");  // Redirect admin here
      } else {
        navigate("/dashboard");        // Redirect normal users here
      }
    } else {
      Swal.fire({
        title: "No user found.",
        text: "It seems that user doesn't exist in our database.",
        icon: "warning",
      });
      setUsername("");
      setPassword("");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-md">
        <div className="mb-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-green-600 flex items-center font-medium"
          >
            <span className="mr-2 text-xl select-none">←</span> Back
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Log in to Your Tracker
        </h1>

        {/* ✅ Use form with onSubmit */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded transition"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?
          <Link to="/register" className="text-green-600 ml-1 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
