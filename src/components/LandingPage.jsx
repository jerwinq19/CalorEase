import { useState, useRef, useEffect } from "react";
import { Link} from "react-router-dom";
import MyNavbar from "./navBar";
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
      <MyNavbar name={'CalorEase'}/>

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
          {/* <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-lg transition">
            Get started
          </button> */}
          <Link to='/login' className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-lg transition">
            Get Started
          </Link>
        </div>
        <div className="mt-6">
          <Link to='/search' className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
            View Food List
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Making Nutrition Tracking Easier</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We recognize the overwhelming nature of most calorie-tracking apps. Thats why we built ColorEase—to make tracking effortless, rewarding, and even fun.
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
          Stop guessing. Start progressing. With ColorEase, youll enjoy features that actually help you succeed.
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
