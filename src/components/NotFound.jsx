import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
                <h1 className="text-2xl font-extrabold text-green-600 tracking-tight">CalorEase</h1>
                    <div className="flex gap-4">
                        <Link to="/" className="hover:underline">Home</Link>
                    </div>
            </header>
            <main className="flex-grow flex items-center justify-center">
                <section>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                    <h1 className="text-3xl font-extrabold text-green-600 tracking-tight">404 NOT FOUND</h1>
                </section>
            </main>
            <footer className="text-center py-6 text-sm text-gray-500 border-t">
                &copy; {new Date().getFullYear()} CalorEase. All rights reserved.
            </footer>
        </div>
    );
};

export default NotFound;
