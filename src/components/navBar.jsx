import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <nav className="flex justify-between items-center bg-green-500 p-4 text-white shadow-md">
      <Link to="/search" className="font-bold text-xl">
        CalorEase
      </Link>
      <div className="flex gap-4">
        <Link to="/search" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      </div>
    </nav>
  );
};

export default MyNavbar;
