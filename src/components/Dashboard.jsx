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
import { getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";


const DashBoard = () => {
    const [change, isChange] = useState(false)
    const [Data, setData] = useState([])
    const [totalCal, setTotalCal] = useState(0)
    const [maxCal, setMaxCalorie] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [RecoFood, setRecoFood] = useState([])
    const [defaultData, setDefaultData] = useState([])
    const [calorieData, setCalorieData] = useState([])
    const [streakData, setStreakData] = useState([])
    const [weightData, setWeightData] = useState([])
    const [username, setUsername] = useState("");
    const [bgColor, setBgColor] = useState("bg-white");
    const [barColor, setBarColor] = useState("bg-green-400");
    const [isFull, setIsFull] = useState(false);
    const navigate = useNavigate()
    const db = getFirestore()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
    
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setData(data.eatenfood || []);
    
                    const totalCalorie = (data.eatenfood || []).reduce(
                        (prev, cur) => prev + (cur.calorie || 0), 0
                    );
                    setTotalCal(totalCalorie);
    
                    const userData = {
                        weight: data.weight,
                        targetWeight: data.target_weight,
                        timeframe: data.time_frame,
                        activity: data.activity_level,
                        age: data.age,
                        height: data.height,
                        gender: data.sex.toLowerCase(),
                        dietPref: data.diet_pref ?? "None"
                    };
    
                    const calculatedMax = CalculateMaxCalorie(userData);
                    setMaxCalorie(calculatedMax);
                }
            }
        });
    
        return () => unsubscribe();
    }, [change]);
    
    useEffect(() => {
        if (!maxCal || !totalCal) return;
    
        const percent = (totalCal / maxCal) * 100;

        if (percent >= 120) {
            setBgColor('bg-red-100');
            setBarColor('bg-red-400');
            setIsFull(true);
        } else if (percent >= 100) {
            setBgColor('bg-orange-100');
            setBarColor('bg-orange-400');
            setIsFull(true);
        } else if (percent >= 60) {
            setBgColor('bg-yellow-100');
            setBarColor('bg-yellow-400');
            setIsFull(false);
        } else {
            setBgColor('bg-white');
            setBarColor('bg-green-400');
            setIsFull(false);
        }
    }, [totalCal, maxCal, change]);
    

    // calculate max calorie
    const CalculateMaxCalorie = ({ weight, targetWeight, timeframe, activity, age, height, gender }) => {
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

    // handles automatic summary system
    const finishEating = () => {
        
    }

    // handle delete 
    const handleDelete = async (id) => {
        try {
            const user = auth.currentUser;
            if (!user) return;
        
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
        
            if (userSnap.exists()) {
                const currentData = userSnap.data().eatenfood || [];
                const updatedData = currentData.filter((item) => item.id !== id);
        
                await updateDoc(userRef, {
                eatenfood: updatedData,
                });
        
                // Refresh local state
                setData(updatedData);
                isChange(prev => !prev)
            }
        } catch (error) {
        console.error("Delete error:", error);
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
                        onClick={null}
                        >
                        Log out
                        </button>
                    </div>

                    {Data.length > 0 ? (
                        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent">
                        {Data.map((item) => (
                        <div
                            key={item.id}
                            className="min-w-[220px] bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all relative"
                        >
                          {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        
                            <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                {item.calorie} kcal
                            </span>
                        
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{item.mealName}</h3>
                                <p className="text-sm text-gray-500">Logged: {item.created_at}</p>
                            </div>
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
                <section className={`${bgColor} p-6 rounded-2xl shadow-lg mb-8 border border-gray-200`}>
                    <h2 className="text-2xl font-bold text-green-600 mb-6 tracking-tight">Today's Summary</h2>

                    <div className="space-y-5">
                        {/* Calorie Totals */}
                        <div className="grid grid-cols-2 gap-4 text-gray-700 text-base font-semibold">
                            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                                <span>Current Intake</span>
                                <span className="text-green-700">
                                    {Data.length > 0 ? `${totalCal.toFixed(2)} kcal` : "No data"}
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
                                    className={`h-full ${barColor} transition-all duration-500`}
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
                        {/* <div className="text-right">
                            <button
                                onClick={null}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full shadow-md transition"
                            >
                                Finish Eating for Today
                            </button>
                        </div> */}
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
                            onClick={null}
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
                    <Modal setShowModal={setShowModal} title={'Update Goal'} size="xl"   closeOnBackdrop={true}>
                        <UpdateHealthGoal maxCalories={maxCal} defaultData={defaultData}/>
                    </Modal>
                )}

            </div>
            
        </>
    );
};

export default DashBoard;