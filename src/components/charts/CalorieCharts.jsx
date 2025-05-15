import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    CartesianGrid,
} from "recharts";

const CaloriesChart = ({ data }) => {
    return (
        <div className="w-full h-80 p-4 bg-white rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-2 text-red-500">Calorie Intake</h2>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalCalorieThatDay" fill="#f87171" name="Calories (kcal)" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
};

export default CaloriesChart;
