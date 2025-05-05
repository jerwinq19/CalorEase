import { useEffect, useState } from "react";

const Modal = ({ children, setShowModal }) => {
    const [showAnim, setShowAnim] = useState(false);

    useEffect(() => {
        // Trigger the animation after mount
        setShowAnim(true);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out">
        <div
            className={`
            bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative overflow-y-auto max-h-[90vh]
            transform transition-all duration-300 ease-out
            ${showAnim ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
        >
            <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setShowModal(false)}
            >
            ✕
            </button>

            {children}
        </div>
        </div>
    );
};

export default Modal;
