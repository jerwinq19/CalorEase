import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
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

  return (
    <div className="font-sans text-gray-800">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md  top-0 z-50 relative">
        <h1 className="text-2xl font-extrabold text-green-600 tracking-tight">
          CalorEase
        </h1>

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
          <Link
            to="/login"
            className="text-gray-600 hover:text-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-600 hover:text-green-700 transition"
          >
            Register
          </Link>
        </nav>

        {/* Mobile Navigation with smooth transition */}
        <nav
          ref={menuRef}
          className="md:hidden bg-white shadow-lg rounded-md absolute right-6 top-full mt-1 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <div className="flex flex-col py-2">
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
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-green-50 via-white to-white">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Track what you eat. <br className="hidden md:block" /> Stay on track.
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Simple, smart calorie tracking for your everyday meals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to='/smartnutrition' className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 shadow transition">
            Learn more
          </Link>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-lg transition">
            Get started
          </button>
        </div>
        <div className="mt-6">
          <button className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
            View Food List
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Making Nutrition Tracking Easier</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We recognize the overwhelming nature of most calorie-tracking apps. That’s why we built ColorEase—to make tracking effortless, rewarding, and even fun.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '📋',
              title: 'Intuitive Tracking',
              desc: 'Our simplified food logging system makes tracking your daily intake fast and hassle-free, with smart suggestions based on your habits.',
            },
            {
              icon: '⚡',
              title: 'Motivational Streaks',
              desc: 'Stay consistent with our fun streak system that rewards daily logging and encourages long-term habit formation.',
            },
            {
              icon: '🍴',
              title: 'Professional Guidance',
              desc: 'Get expert advice from certified nutritionists and trainers who tailor recommendations to your goals.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">{icon}</div>
              <h4 className="text-lg font-semibold mb-2">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Crush Your Health Goals with Confidence</h3>
        <p className="text-gray-600 mb-6">
          Stop guessing. Start progressing. With ColorEase, you’ll enjoy features that actually help you succeed.
        </p>
        <ul className="list-disc text-left text-sm text-gray-700 space-y-3 pl-6">
          <li>Track daily nutrition effortlessly with intelligent suggestions</li>
          <li>Stay engaged with achievement badges and streak rewards</li>
          <li>Receive personalized plans from certified professionals</li>
          <li>Understand your journey through clear visual analytics</li>
        </ul>
        <Link to='/smartnutrition' className="inline-block mt-6 text-sm text-green-600 hover:underline">
          Learn more →
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} ColorEase. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
