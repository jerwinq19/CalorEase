import { Link } from "react-router-dom"


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