import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./navBar";
import Swal from "sweetalert2";
import axios from "axios";


const DashBoard = () => {
    const [change, isChange] = useState(false)
    const [data, setData] = useState([])
    const [totalCal, setTotalCal] = useState(0)
    const [maxCal, setMaxCalorie] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [RecoFood, setRecoFood] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCalories = async () => {
            try {
                const allAccounts = JSON.parse(localStorage.getItem('Accounts')) || [];
                const currentUserId = localStorage.getItem('CurrentUserId');
    
                const currentUserIndex = allAccounts.findIndex(user => user.id === currentUserId);
                const currentUserData = allAccounts[currentUserIndex];
    
                console.log(currentUserData);
    
                const maxCalorie = calculateMaxCalorie({
                    weight: Number(currentUserData.weight),
                    targetWeight: Number(currentUserData.targetWeight),
                    timeframe: Number(currentUserData.timeFrame),
                    activity: currentUserData.activityLevel,
                    age: 20,
                    height: 172.72,
                    gender: currentUserData.gender.toLowerCase()
                });

                console.log(maxCalorie)

                const sampleData = await fetchRecomended({ diet: currentUserData.dietPref, maxcal: maxCalorie });
                setRecoFood(sampleData)
                console.log(sampleData)
                
                const sumCal = currentUserData.eatenFood.reduce((x, y) => x + y.kcal, 0);
                setTotalCal(sumCal);
                setMaxCalorie(maxCalorie)
                setData(currentUserData.eatenFood);
            } catch (error) {
                console.error("Error in fetchCalories:", error);
            }
        };
    
        fetchCalories();
    }, [change]);
    
    const fetchRecomended = async ({ diet, maxcal }) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                diet,
                number: 6,
                apiKey: process.env.REACT_APP_API_KEY,
                addRecipeNutrition: true,
                maxCalories: maxcal
                }
            });
            
            return response.data.results;
        } catch (err) {
            Swal.fire({
                title: "Error fetching API Data",
                text: "Error fetching API data...",
                icon: "error"
            });
        }
    };

    const calculateMaxCalorie = ({ weight, targetWeight, timeframe, activity, age, height, gender }) => {
        const activityFactors = {
            sedentary: 1.2,
            lightly_active: 1.375,
            moderately_active: 1.55,
            very_active: 1.725,
            extra_active: 1.9
        };
    
        const key = activity.replace(" ", "_").toLowerCase();
        const factor = activityFactors[key];
    
        if (!factor || isNaN(weight) || isNaN(targetWeight) || isNaN(timeframe) || isNaN(age) || isNaN(height)) {
            return NaN;
        }
    
        const bmr = gender === 'male'
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;
    
        const tdee = bmr * factor;
        const weightDiff = targetWeight - weight;
        const dailyChange = (7700 * Math.abs(weightDiff)) / (timeframe * 7); // convert weeks to days
    
        const isGaining = weightDiff > 0;
        const adjustedCalories = isGaining ? tdee + dailyChange : tdee - dailyChange;
    
        return Math.round(adjustedCalories);
    };
    

    const handleLogout = () => {
        localStorage.removeItem("CurrentUserId"); // or "CurrentUsername" depending on what you used
        
        // Optional: redirect to login page
        navigate("/");
        
        // Optional: show confirmation
        Swal.fire({
            title: "Logged out",
            text: "You have been successfully logged out.",
            icon: "success"
        });
    };
        

    return(
        <>
            <MyNavbar />
            <div className="p-5 max-w-6xl mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1> 
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition" onClick={handleLogout}>Log out</button>

                {/* Daily Log Section */}
                <section className="bg-slate-100 p-6 rounded-xl shadow mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-700">Daily Log</h2>

                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"  onClick={() => setShowModal(true)}>
                            Add Meals
                        </button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pb-2">
                    {data.length > 0 ? (
                        data.map((item) => (
                        <div
                            key={item.id}
                            className="min-w-[200px] bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-lg transition-all"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                            Calories: <span className="font-medium">{item.kcal} kcal</span>
                            </p>
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No meals added yet.</p>
                    )}
                    </div>
                </section>

                {/* Summary Section */}
                <section className="bg-slate-100 p-6 rounded-xl shadow mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Summary</h2>

                    <div className="space-y-4">
                        {/* Totals */}
                        <div className="flex justify-between text-gray-700 font-medium">
                            <p>Total Current Calories:</p>
                            <p>{data.length > 0 ? `${totalCal.toFixed(2)} kcal` : "No calories yet..."}</p>
                        </div>

                        <div className="flex justify-between text-gray-700 font-medium">
                            <p>Total Target Calories:</p>
                            <p>{maxCal}kcal</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full mt-4">
                        <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                            <div
                            className={`h-full bg-green-500 transition-all duration-500`}
                            style={{
                                width: `${Math.min((totalCal / maxCal) * 100, 100)}%`,
                            }}
                            ></div>
                        </div>
                        <p className="text-right text-sm text-gray-600 mt-1">
                            {Math.min((totalCal / maxCal) * 100, 100).toFixed(1)}% of your goal
                        </p>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-100 p-4 rounded-xl shadow mb-8">
                    <h1 className="text-xl font-semibold text-gray-700 mb-4">Recommended for You</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {RecoFood.length > 0 ? (
                        RecoFood.map((item, idx) => {
                            const calories = item.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount;

                            return (
                            <div
                                key={idx}
                                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all flex flex-col items-center text-center"
                            >
                                <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded mb-3"
                                />
                                <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">
                                Calories: <span className="font-medium">{calories ? `${Math.round(calories)} kcal` : "N/A"}</span>
                                </p>
                            </div>
                            );
                        })
                        ) : (
                        <p className="text-gray-500 italic col-span-full text-center">No recommendations available yet.</p>
                        )}
                    </div>
                    </section>


                {showModal && (
                    <Modal setShowModal={setShowModal}>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">Add a New Meal</h2>
                    
                        <input
                        type="text"
                        placeholder="Enter meal name..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    
                        <textarea
                        placeholder="Enter meal ingredients... eg. 2 Boiled eggs and 1 cup of Rice"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    
                        <div className="flex justify-end">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            onClick={null}
                        >
                            Submit
                        </button>
                        </div>
                    </div>  
                </Modal>
                )}

            </div>
            
        </>
    );
};

export default DashBoard;