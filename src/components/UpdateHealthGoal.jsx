import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateHealthGoal = ({ maxCalories, defaultData }) => {
    const [weight, setWeight] = useState(0);
    const [target, setTarget] = useState(0);
    const [timeframe, setTimeframe] = useState(0);
    const [actLevel, setActLevel] = useState("");
    const [diet, setDiet] = useState("");
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (defaultData) {
            setWeight(defaultData.weight || 0);
            setActLevel(defaultData.activity || "");
            setTarget(defaultData.targetWeight || 0);
            setDiet(defaultData.dietPref || "");
            setTimeframe(defaultData.timeframe || 0);
            setAge(defaultData.age || 0);
            setHeight(defaultData.height || 0);
        }
    }, [defaultData]);

    const handleSubmit = () => {
        const allAccounts = JSON.parse(localStorage.getItem("Accounts")) || [];
        const currentUserId = localStorage.getItem("CurrentUserId");
        const currentUserIndex = allAccounts.findIndex(user => user.id === currentUserId);
        
        if (currentUserIndex !== -1) {
            allAccounts[currentUserIndex] = {
                ...allAccounts[currentUserIndex],
                weight,
                targetWeight: target,
                timeframe,
                activity: actLevel,
                dietPref: diet,
                age,
                height,
            };
            
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Saved!", "", "success");
                    localStorage.setItem("Accounts", JSON.stringify(allAccounts));
                } else if (result.isDenied) {
                    return Swal.fire("Changes are not saved", "", "info");
                }
                });
        }
    };

    return (
        <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium text-sm mb-1">Weight (kg)</label>
                        <input
                            type="number"
                            placeholder="Your weight"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-sm mb-1">Target Weight (kg)</label>
                        <input
                            type="number"
                            placeholder="Your target weight"
                            value={target}
                            onChange={(e) => setTarget(Number(e.target.value))}
                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-sm mb-1">Timeframe (Weeks)</label>
                        <input
                            type="number"
                            placeholder="Weeks"
                            value={timeframe}
                            onChange={(e) => setTimeframe(Number(e.target.value))}
                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-sm mb-1">Age</label>
                        <input
                            type="number"
                            placeholder="Your age"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium text-sm mb-1">Height (cm)</label>
                        <input
                            type="number"
                            placeholder="Your height"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-sm mb-1">Activity Level</label>
                        <select
                            value={actLevel}
                            onChange={(e) => setActLevel(e.target.value)}
                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
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
                        <label className="block font-medium text-sm mb-1">Dietary Preferences</label>
                        <select
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
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

            {/* Submit */}
            <div className="mt-6 text-center">
                <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition font-semibold"
                >
                    Update Health Goals
                </button>
            </div>

            {/* Summary */}
            <div className="mt-8 bg-gray-100 rounded-xl p-6 text-sm text-gray-700 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Goal Summary</h3>
                <p><span className="font-medium">Age:</span> {age || "N/A"} years</p>
                <p><span className="font-medium">Height:</span> {height || "N/A"} cm</p>
                <p><span className="font-medium">Current Weight:</span> {weight || "N/A"} kg</p>
                <p><span className="font-medium">Target Weight:</span> {target || "N/A"} kg in {timeframe || "N/A"} weeks</p>
                <p><span className="font-medium">Activity Level:</span> {actLevel || "N/A"}</p>
                <p><span className="font-medium">Diet Preference:</span> {diet || "N/A"}</p>
                <hr className="my-2" />
                <p>
                    <span className="font-semibold text-green-700">Max Daily Calories:</span>{" "}
                    {maxCalories ? (
                        <span>{maxCalories} kcal</span>
                    ) : (
                        <span className="italic text-gray-500">Set your details to calculate.</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default UpdateHealthGoal;
