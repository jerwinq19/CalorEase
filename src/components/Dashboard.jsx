import React, { useState, useEffect} from "react";

const DashBoard = () => {
    const [data, setData] = useState([])
    const [totalCal, setTotalCal] = useState(0)

    useEffect(() => {
        const fetchCalories = async () => {
            const calorieData = await JSON.parse(localStorage.getItem('calorieAdded')) || []
            const sumCalorie = calorieData.reduce((initVal, currVal) => initVal + currVal.kcal, 0)
            setTotalCal(sumCalorie)
            setData(prev => [...prev, ...calorieData])
            
        };
        fetchCalories()
    },[])


    return(
        <div className="p-5 max-w-6xl mx-auto">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

            {/* Daily Log Section */}
            <section className="bg-slate-100 p-6 rounded-xl shadow mb-8">
                <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Daily Log</h2>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
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
            <section className="bg-slate-100 p-6 rounded-xl shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Summary</h2>

                <div className="space-y-4">
                    {/* Totals */}
                    <div className="flex justify-between text-gray-700 font-medium">
                        <p>Total Current Calories:</p>
                        <p>{data.length > 0 ? `${totalCal.toFixed(2)} kcal` : "No calories yet..."}</p>
                    </div>

                    <div className="flex justify-between text-gray-700 font-medium">
                        <p>Total Target Calories:</p>
                        <p>2000 kcal</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full mt-4">
                    <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                        <div
                        className={`h-full bg-green-500 transition-all duration-500`}
                        style={{
                            width: `${Math.min((totalCal / 5000) * 100, 100)}%`,
                        }}
                        ></div>
                    </div>
                    <p className="text-right text-sm text-gray-600 mt-1">
                        {Math.min((totalCal / 5000) * 100, 100).toFixed(1)}% of your goal
                    </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashBoard;