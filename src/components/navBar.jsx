import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";


const MyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const location = useLocation();
  const isLoggedIn = !!currentUser;
  const db = getFirestore();


  // Sync auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef);
        
        const data = userSnap.data()
        localStorage.setItem("CurrentUserId", user.uid);
        localStorage.setItem("CurrentUsername", data?.username || user.email); 
      } else {
        setCurrentUser(null);
        localStorage.removeItem("CurrentUserId");
        localStorage.removeItem("CurrentUsername");
      }
    });

    return () => unsubscribe();
  }, []);

  // Animate mobile menu height
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      setMaxHeight(`${menuRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [menuOpen]);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        title: "Logged out",
        text: "You have been successfully logged out.",
        icon: "success",
      });
      setMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md top-0 z-50 relative">
      <Link to="/" className="text-2xl font-extrabold text-green-600 tracking-tight">
        {location.pathname === "/dashboard" && localStorage.getItem("CurrentUserId")
          ? `Welcome back, ${localStorage.getItem("CurrentUsername") || "User"}!`
          : "CalorEase"}
      </Link>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden text-gray-600 hover:text-green-700 focus:outline-none"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-sm">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="text-gray-600 hover:text-green-700 transition">ACCOUNT</Link>
            <Link to="/search" className="text-gray-600 hover:text-green-700 transition">FOOD</Link>
            <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 transition">LOGOUT</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-green-700 transition">Login</Link>
            <Link to="/register" className="text-gray-600 hover:text-green-700 transition">Register</Link>
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
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
                onClick={handleLogout}
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
