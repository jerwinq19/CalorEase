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
        <Link to="/updategoal" className="hover:underline">Update Goal</Link>
        <Link to="/smartnutrition" className="hover:underline">Smart Nutrition</Link>
        <Link to="/register" className="hover:underline">Register</Link> {/* Optional */}
      </div>
    </nav>
  );
};

<<<<<<< HEAD
export default MyNavbar;
=======
const MyNavbar = ({children}) => {
    return(
        <nav className='flex justify-between items-center bg-green-500 p-5'>
            <Link to="/search" className='bg-red-500 p-2'>Home</Link>
            <Link to="/landing" className='bg-red-500 p-2'>Landing Page</Link>
            <span className='flex gap-3'>
                <Link to="/dashboard" className='bg-red-500 p-2'>Acount</Link>
                <Link to="/login" className='bg-red-500 p-2'>Login</Link>
                <Link to="/updategoal" className='bg-red-500 p-2'>Update Goal</Link>
            </span>
        </nav>
    )
}

export default MyNavbar;
>>>>>>> 9fca7e79f62c7a190d30fd7bc4454b842883f86e
