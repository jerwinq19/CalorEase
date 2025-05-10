import MyNavbar from "./navBar";
import { useState } from "react";

const UpdateHealthGoal = () => {
    // State variables for storing user input
    const [weight, setWeight] = useState(0);
    const [target, setTarget] = useState(0);
    const [timeframe, setTimeframe] = useState(0);
    const [actLevel, setActLevel] = useState("");
    const [diet, setDiet] = useState("");

    const handleSubmit = () => {
        const allAccounts = JSON.parse(localStorage.getItem('Accounts')) || [];
        const currentUserId = localStorage.getItem('CurrentUserId');

        const currentUserIndex = allAccounts.findIndex(user => user.id === currentUserId);
    };

    return (
        <>
            <MyNavbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-6xl bg-white rounded-lg p-8 shadow-md">
                    <h2 className="text-center text-xl font-semibold">Settings</h2>
                    <h1 className="text-center text-2xl font-bold mb-8">Health & Goals</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-200 p-6 rounded-md">
                        {/* Left side inputs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold">Weight (kg):</label>
                                <input
                                    type="number"
                                    placeholder="Your Weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full p-2 rounded-full border-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Target Weight (kg):</label>
                                <input
                                    type="number"
                                    placeholder="Your target Weight"
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    className="w-full p-2 rounded-full border-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Timeframe (Weeks):</label>
                                <input
                                    type="number"
                                    placeholder="weeks"
                                    value={timeframe}
                                    onChange={(e) => setTimeframe(e.target.value)}
                                    className="w-full p-2 rounded-full border-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Right side inputs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold">Activity Level:</label>
                                <select
                                    value={actLevel}
                                    onChange={(e) => setActLevel(e.target.value)}
                                    className="w-full p-2 rounded-full border-none text-sm"
                                >
                                    <option value="">Select Activity Level</option>
                                    <option value="Sedentary">Sedentary</option>
                                    <option value="Lightly active">Lightly active</option>
                                    <option value="Moderately active">Moderately active</option>
                                    <option value="Very active">Very active</option>
                                    <option value="Extra active">Extra active</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-semibold">Dietary Preferences</label>
                                <select
                                    value={diet}
                                    onChange={(e) => setDiet(e.target.value)}
                                    className="w-full p-2 rounded-full border-none text-sm"
                                >
                                    <option value="">Choose your preferences</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Keto">Keto</option>
                                    <option value="Paleo">Paleo</option>
                                    <option value="No preference">No preference</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-6">
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
                            onClick={handleSubmit}
                        >
                            Update Health Goals
                        </button>
                    </div>

                    {/* Placeholder for response or chart or summary */}
                    <div className="bg-gray-200 mt-8 rounded-lg h-64 p-6" />
                </div>
            </div>
        </>
    );
};

export default UpdateHealthGoal;
