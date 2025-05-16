// NotFoundPage.jsx
import { Link } from "react-router-dom";
import { Flame } from "lucide-react"; // for icon (optional)

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-6">
            {/* Logo + Icon */}
            <div className="flex items-center gap-2 mb-6">
                <Flame className="text-green-500 w-8 h-8" />
                <span className="text-xl font-semibold text-green-600">Calorease</span>
            </div>

            {/* Status Code */}
            <h1 className="text-8xl font-extrabold text-green-500 drop-shadow-sm">404</h1>
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-800">
                Page Not Found
            </p>
            <p className="mt-2 text-gray-500 text-base max-w-md text-center">
                The page you're looking for doesn’t exist or has been moved. Let’s get you back on track.
            </p>

            {/* CTA Button */}
            <Link
                to="/"
                className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition-all duration-200"
            >
                Go Back Home
            </Link>
        </div>
    );  
};

export default NotFound;
