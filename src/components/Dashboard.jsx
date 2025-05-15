import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import { useNavigate,    } from "react-router-dom";
import MyNavbar from "./navBar";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom"
import UpdateHealthGoal from "./UpdateHealthGoal";
import CaloriesChart from "./charts/CalorieCharts";
import StreakChart from "./charts/StreakCharts";
import WeightChart from "./charts/WeightCharts";

const DashBoard = () => {
    const [change, isChange] = useState(false)
    const [data, setData] = useState([])
    const [totalCal, setTotalCal] = useState(0)
    const [maxCal, setMaxCalorie] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [RecoFood, setRecoFood] = useState([])
    const [defaultData, setDefaultData] = useState([])
    const [calorieData, setCalorieData] = useState([])
    const [streakData, setStreakData] = useState([])
    const [weightData, setWeightData] = useState([])
    const [username, setUsername] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCalories = async () => {
            try {
                const allAccounts = JSON.parse(localStorage.getItem('Accounts')) || [];
                const currentUserId = localStorage.getItem('CurrentUserId');
    
                const currentUserIndex = allAccounts.findIndex(user => user.id === currentUserId);
                const currentUserData = allAccounts[currentUserIndex];
    
                const userData = {
                    weight: Number(currentUserData.weight),
                    targetWeight: Number(currentUserData.targetWeight),
                    timeframe: Number(currentUserData.timeFrame),
                    activity: currentUserData.activityLevel,
                    age: 20,
                    height: 172.72,
                    gender: currentUserData.gender.toLowerCase(),
                    dietPref: currentUserData.dietPref
                }
    
                const maxCalorie = calculateMaxCalorie(userData);

                console.log(currentUserData)
                setCalorieData(currentUserData.analytics.calories)
                setStreakData(currentUserData.analytics.streaks)
                setWeightData()
                setDefaultData(userData);

                const sampleData = await fetchRecomended({ diet: currentUserData.dietPref, maxcal: maxCalorie });
                setRecoFood(sampleData)
                
                const sumCal = currentUserData.eatenFood.reduce((x, y) => x + y.kcal, 0);
                setTotalCal(sumCal);
                setMaxCalorie(maxCalorie)
                setData(currentUserData.eatenFood);

                const storedUsername = localStorage.getItem("CurrentUsername");
                if (storedUsername) {
                    setUsername(storedUsername);
                }
                
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
                    sort: "random",
                },
            });
    
            const meals = response.data.results;
    
            // Optional: filter meals under max calories
            const filteredMeals = meals.filter(item => {
                const cal = item.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount;
                return cal && cal <= maxcal;
            });
    
            const shuffled = filteredMeals.sort(() => Math.random() - 0.5);
            return shuffled;
        } catch (err) {
            console.error("API error:", err);
            Swal.fire({
                title: "Error fetching API Data",
                text: "Check your API key or connection.",
                icon: "error"
            });
            return [];
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
        localStorage.removeItem("CurrentUsername");

        // Optional: redirect to login page
        navigate("/");
        
        // Optional: show confirmation
        Swal.fire({
            title: "Logged out",
            text: "You have been successfully logged out.",
            icon: "success"
        });
    };
        
    const onUpdateGoal = () => {
        setShowModal(true)
    } 


    const handleFinishEating = () => {
            const allAccounts = JSON.parse(localStorage.getItem('Accounts')) || [];
            const currentUserId = localStorage.getItem('CurrentUserId');
            const currentUserIndex = allAccounts.findIndex(user => user.id === currentUserId);
            const currentUserData = allAccounts[currentUserIndex];

            const currentDate = new Date().toISOString().split("T")[0]; // Use YYYY-MM-DD

            const calorieData = {
                date: currentDate,
                totalCalorieThatDay: Math.min(totalCal, maxCal < totalCal ? totalCal : maxCal)
            }  

            Swal.fire({
                title: "Finish your day?",
                text: "Do you want to save today's calorie data?",
                icon: "question",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "✅ Save",
                denyButtonText: "❌ Don't Save",
                cancelButtonText: "Back",
                confirmButtonColor: "#28a745",  // green
                denyButtonColor: "#dc3545",     // red
                cancelButtonColor: "#6c757d",   // gray
                reverseButtons: true,
                customClass: {
                    popup: 'swal2-border-radius-lg'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    currentUserData.eatenFood = [];
                    currentUserData.analytics.calories.push(calorieData);
                    localStorage.setItem('Accounts', JSON.stringify(allAccounts));
                    isChange(prev => !prev);
            
                    Swal.fire({
                        title: "Day Completed!",
                        text: "Your calorie intake has been logged. See you tomorrow!",
                        icon: "success",
                        confirmButtonColor: "#28a745"
                    });
                } else if (result.isDenied) {
                    Swal.fire({
                        title: "Not saved",
                        text: "Your changes were not saved.",
                        icon: "info",
                        confirmButtonColor: "#6c757d"
                    });
                }
            });

            const streaks = currentUserData.analytics.streaks || [];
            const last = streaks.at(-1); // gets last element
            const alreadyLogged = streaks.some(s => s.date === currentDate);

            if (!alreadyLogged) {
            let newStreak = 1;

            if (last) {
                const lastDate = new Date(last.date);
                const current = new Date(currentDate);

                // Check if the last date is exactly yesterday
                lastDate.setDate(lastDate.getDate() + 1);
                const isConsecutive = lastDate.toDateString() === current.toDateString();

                if (isConsecutive) {
                newStreak = (last.streak || 1) + 1;
                }
            }

            streaks.push({ date: currentDate, streak: newStreak });
            }

            
    };

    return(
        <>
            <MyNavbar name={username ? `Welcome back, ${username}!` : "CalorEase"}/>
            <div className="p-5 max-w-6xl mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">DASHBOARD</h1> 

                {/* Daily Log Section */}
                <section className="bg-gradient-to-br from-slate-100 to-white p-6 rounded-2xl shadow-lg mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Daily Log</h2>

                        <button
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition"
                        onClick={handleLogout}
                        >
                        Log out
                        </button>
                    </div>

                    {data.length > 0 ? (
                        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent">
                        {data.map((item) => (
                            <div
                            key={item.id}
                            className="min-w-[220px] bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all relative"
                            >
                            <span className="absolute top-2 right-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                {item.kcal} kcal
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-500">Logged: {new Date(item.created_at).toLocaleTimeString()}</p>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                        <p className="text-gray-500 italic mb-2">No meals added yet.</p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md text-sm shadow-sm transition"
                        onClick={() => navigate('/search')}>
                            Add your first meal
                        </button>
                        </div>
                    )}  
                </section>


                {/* Summary Section */}
                <section className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-green-600 mb-6 tracking-tight">Today's Summary</h2>

                    <div className="space-y-5">
                        {/* Calorie Totals */}
                        <div className="grid grid-cols-2 gap-4 text-gray-700 text-base font-semibold">
                            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                                <span>Current Intake</span>
                                <span className="text-green-700">
                                    {data.length > 0 ? `${totalCal.toFixed(2)} kcal` : "No data"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                                <span>Daily Goal</span>
                                <span className="text-slate-700">{maxCal} kcal</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all duration-500"
                                    style={{
                                        width: `${Math.min((totalCal / maxCal) * 100, 100)}%`,
                                    }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 text-right mt-1">
                                {Math.min((totalCal / maxCal) * 100, 100).toFixed(1)}% of your daily goal
                            </p>
                        </div>

                        {/* Button */}
                        <div className="text-right">
                            <button
                                onClick={handleFinishEating}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full shadow-md transition"
                            >
                                Finish Eating for Today
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="w-full py-10 px-4 md:px-8 bg-gradient-to-br from-white to-slate-100">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-10 text-center">
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                            Health Analytics Overview
                        </h1>
                        <p className="mt-2 text-gray-500">Track your performance and body progress over time</p>
                        <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
                        </div>

                        {/* Top: Calorie chart (full width) */}
                        <div className="mb-6">
                        <div className="hover:scale-[1.02] transition-transform duration-300">
                            <CaloriesChart data={calorieData} />
                        </div>
                        </div>

                        {/* Bottom: Streak + Weight charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="hover:scale-[1.02] transition-transform duration-300">
                            <StreakChart data={streakData} />
                        </div>
                        <div className="hover:scale-[1.02] transition-transform duration-300">
                            <WeightChart data={weightData} />
                        </div>
                        </div>
                    </div>
                </section>


                
                {/* CALORIE GOAL SECTION */}
                <section className="bg-slate-100 p-6 rounded-xl shadow mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Calorie Goal</h2>

                    <p className="text-gray-600 mb-6">
                        Your current goal is <span className="font-semibold text-gray-800">{maxCal} kcal</span>
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={onUpdateGoal}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                        >
                            Update Goal
                        </button>

                        <Link 
                            to="/smartnutrition" 
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
                            Learn more about your nutrition
                        </Link>
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
                    <Modal setShowModal={setShowModal} title={'Updatae Goal'} size="xl"   closeOnBackdrop={true}>
                        <UpdateHealthGoal maxCalories={maxCal} defaultData={defaultData}/>
                    </Modal>
                )}

            </div>
            
        </>
    );
};

export default DashBoard;