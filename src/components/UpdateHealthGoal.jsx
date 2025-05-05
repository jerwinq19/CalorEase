const UpdateHealthGoal = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-6xl bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-center text-xl font-semibold">Settings</h2>
                <h1 className="text-center text-2xl font-bold mb-8">Health & Goals</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-200 p-6 rounded-md">
                    {/* Left side inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold">Weight (kg):</label>
                            <input type="number" placeholder="Your Weight" className="w-full p-2 rounded-full border-none text-sm" />
                        </div>
                        <div>
                            <label className="block font-semibold">Target Weight (kg):</label>
                            <input type="number" placeholder="Your target Weight" className="w-full p-2 rounded-full border-none text-sm" />
                        </div>
                        <div>
                            <label className="block font-semibold">Timeframe (Weeks):</label>
                            <input type="number" placeholder="weeks" className="w-full p-2 rounded-full border-none text-sm" />
                        </div>
                    </div>

                    {/* Right side inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold">Activity Level:</label>
                            <select className="w-full p-2 rounded-full border-none text-sm">
                                <option>Sedentary</option>
                                <option>Lightly active</option>
                                <option>Moderately active</option>
                                <option>Very active</option>
                                <option>Extra active</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold">Dietary Preferences</label>
                            <select className="w-full p-2 rounded-full border-none text-sm">
                                <option>Choose your preferences</option>
                                <option>Vegetarian</option>
                                <option>Vegan</option>
                                <option>Keto</option>
                                <option>Paleo</option>
                                <option>No preference</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-center text-sm mb-1">value: 0.25 kg</label>
                            <input type="range" min="0" max="2" step="0.25" className="w-full" />
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
                        Update Health Goals
                    </button>
                </div>

                {/* Placeholder for response or chart or summary */}
                <div className="bg-gray-200 mt-8 rounded-lg h-64 p-6" />
            </div>
        </div>
    );
};

export default UpdateHealthGoal;
