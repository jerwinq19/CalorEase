import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    CartesianGrid,
} from "recharts";

const StreakChart = ({ data }) => (
    <div className="w-full h-80 p-4 bg-white rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-2 text-green-500">Goal Streak</h2>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="streak" stroke="#34d399" name="Streak (days)" />
        </LineChart>
        </ResponsiveContainer>
    </div>
);

export default StreakChart;
