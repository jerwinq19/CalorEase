import { useEffect, useState } from "react";

const sizeMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
};

const Modal = ({
    children,
    setShowModal,
    title,
    showCloseButton = true,
    disableClose = false,
    size = "md",
    closeOnBackdrop = true,
    }) => {
    const [showAnim, setShowAnim] = useState(false);

    useEffect(() => {
        setShowAnim(true);

        const handleKeyDown = (e) => {
        if (e.key === "Escape" && !disableClose) {
            setShowModal(false);
        }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [disableClose, setShowModal]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnBackdrop && !disableClose) {
        setShowModal(false);
        }
    };

    return (
        <div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
        >
        <div
            className={`bg-white rounded-xl shadow-xl w-[90%] ${sizeMap[size]} p-6 relative max-h-[90vh] overflow-y-auto
            transform transition-all duration-300 ease-out
            ${showAnim ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
        >
            {showCloseButton && !disableClose && (
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
            >
                ✕
            </button>
            )}
            {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
            {children}
        </div>
        </div>
  );
};

export default Modal;
