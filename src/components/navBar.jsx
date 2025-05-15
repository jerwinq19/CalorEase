import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";


const MyNavbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");
  
    // Adjust maxHeight based on menu content height
    useEffect(() => {
      if (menuOpen && menuRef.current) {
        setMaxHeight(`${menuRef.current.scrollHeight}px`);
      } else {
        setMaxHeight("0px");
      }
    }, [menuOpen]);
    
  const location = useLocation();
  
  const isLoggedIn = !!localStorage.getItem("CurrentUserId");
  const username = localStorage.getItem("CurrentUsername") || "User";
  
  const handleLogout = () => {
    localStorage.removeItem("CurrentUserId");
    localStorage.removeItem("CurrentUsername");
    window.location.href = "/";

    Swal.fire({
          title: "Logged out",
          text: "You have been successfully logged out.",
          icon: "success"
      });
  }
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md  top-0 z-50 relative">
        <Link to='/' className="text-2xl font-extrabold text-green-600 tracking-tight">
          {location.pathname === "/dashboard" && localStorage.getItem("CurrentUserId")
            ? `Welcome back, ${localStorage.getItem("CurrentUsername") || "User"}!`
            : "CalorEase"}
        </Link>


        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-gray-600 hover:text-green-700 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-green-700 transition">
                ACCOUNT
              </Link>
              <button
                onClick={() => {handleLogout()}}
                className="text-gray-600 hover:text-red-600 transition"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-green-700 transition">
                Login
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-green-700 transition">
                Register
              </Link>
            </>
          )}
        </nav>


        {/* Mobile Navigation with smooth transition */}
        <nav
          ref={menuRef}
          className="md:hidden bg-white shadow-lg rounded-md absolute right-6 top-full mt-1 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <div className="flex flex-col py-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  ACCOUNT
                </Link>
                <button
                  className="px-4 py-2 text-left text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
                  onClick={() => {
                    localStorage.removeItem("CurrentUserId");
                    localStorage.removeItem("CurrentUsername");
                    setMenuOpen(false);
                    window.location.href = "/";
                  }}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

      </header>
  );
};

MyNavbar.defaultProps = {
  name: "CalorEase",
};

export default MyNavbar;
