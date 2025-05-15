import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Area,
    CartesianGrid,
} from "recharts";

const WeightChart = ({ data }) => (
    <div className="w-full h-80 p-4 bg-white rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-2 text-yellow-500">Weight Tracking</h2>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip />
            <Legend />
            <Area
            type="monotone"
            dataKey="weight"
            stroke="#facc15"
            fill="#fde68a"
            name="Weight (kg)"
            />
        </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default WeightChart;
