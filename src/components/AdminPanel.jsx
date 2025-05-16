import { useState, useEffect } from "react";

// dummy data

const dummyAccounts = [
        {
        id: "8efxs8e9DhLRKwkbq17nF",
        username: "nico123",
        password: "12345",
        weight: 66,
        targetWeight: 77,
        timeFrame: 10,
        activityLevel: "Sedentary",
        dietPref: "Vegetarian",
        gender: "Male",
        age: 19,
        height: 172,
        eatenFood: [],
        analytics: {
            calories: [
            { date: "2025-04-01", totalCalorieThatDay: 1800 },
            { date: "2025-04-02", totalCalorieThatDay: 1900 },
            { date: "2025-04-03", totalCalorieThatDay: 1700 },
            { date: "2025-04-04", totalCalorieThatDay: 2000 },
            { date: "2025-04-05", totalCalorieThatDay: 1750 },
            { date: "2025-04-06", totalCalorieThatDay: 1850 },
            { date: "2025-04-07", totalCalorieThatDay: 1600 },
            { date: "2025-04-08", totalCalorieThatDay: 1950 },
            { date: "2025-04-09", totalCalorieThatDay: 1800 },
            { date: "2025-04-10", totalCalorieThatDay: 1900 },
            { date: "2025-04-11", totalCalorieThatDay: 2000 }
            ],
            weight: [
            { date: "2025-04-01", weight: 66 },
            { date: "2025-04-04", weight: 66.2 },
            { date: "2025-04-07", weight: 66.5 },
            { date: "2025-04-10", weight: 66.7 },
            { date: "2025-04-13", weight: 67 }
            ],
            streaks: [
            { date: "2025-04-01", streak: 1},
            { date: "2025-04-02", streak: 0},
            { date: "2025-04-03", streak:  0},
            { date: "2025-04-04", streak: 1},
            { date: "2025-04-05", streak: 1},
            { date: "2025-04-06", streak: 1},
            { date: "2025-04-07", streak: 0},
            { date: "2025-04-08", streak: 0},
            { date: "2025-04-09", streak: 0},
            { date: "2025-04-10", streak: 1}
            ]
        }
        },
        {
        id: "1Kd7q2GjHbLtpZeFxWm09",
        username: "jane_fit",
        password: "securepass",
        weight: 59,
        targetWeight: 54,
        timeFrame: 8,
        activityLevel: "Active",
        dietPref: "Vegan",
        gender: "Female",
        age: 22,
        height: 165,
        eatenFood: [],
        analytics: {
            calories: [
            { date: "2025-04-01", totalCalorieThatDay: 1600 },
            { date: "2025-04-02", totalCalorieThatDay: 1550 },
            { date: "2025-04-03", totalCalorieThatDay: 1620 },
            { date: "2025-04-04", totalCalorieThatDay: 1580 },
            { date: "2025-04-05", totalCalorieThatDay: 1500 },
            { date: "2025-04-06", totalCalorieThatDay: 1490 },
            { date: "2025-04-07", totalCalorieThatDay: 1450 },
            { date: "2025-04-08", totalCalorieThatDay: 1600 },
            { date: "2025-04-09", totalCalorieThatDay: 1550 },
            { date: "2025-04-10", totalCalorieThatDay: 1575 }
            ],
            weight: [
            { date: "2025-04-01", weight: 59 },
            { date: "2025-04-03", weight: 58.8 },
            { date: "2025-04-06", weight: 58.5 },
            { date: "2025-04-09", weight: 58.2 },
            { date: "2025-04-11", weight: 58 }
            ],
            streaks: [
            { date: "2025-04-01", type: "met_goal" },
            { date: "2025-04-02", type: "met_goal" },
            { date: "2025-04-03", type: "met_goal" },
            { date: "2025-04-04", type: "met_goal" },
            { date: "2025-04-05", type: "missed_goal" },
            { date: "2025-04-06", type: "met_goal" },
            { date: "2025-04-07", type: "met_goal" },
            { date: "2025-04-08", type: "met_goal" },
            { date: "2025-04-09", type: "missed_goal" },
            { date: "2025-04-10", type: "met_goal" }
            ]
        }
        },
        {
        id: "3GywrJfKzYHxZqL9fUVb1",
        username: "marko_lean",
        password: "fitlife",
        weight: 78,
        targetWeight: 70,
        timeFrame: 12,
        activityLevel: "Moderate",
        dietPref: "None",
        gender: "Male",
        age: 28,
        height: 180,
        eatenFood: [],
        analytics: {
            calories: [
            { date: "2025-04-01", totalCalorieThatDay: 2200 },
            { date: "2025-04-02", totalCalorieThatDay: 2150 },
            { date: "2025-04-03", totalCalorieThatDay: 2100 },
            { date: "2025-04-04", totalCalorieThatDay: 2250 },
            { date: "2025-04-05", totalCalorieThatDay: 2300 },
            { date: "2025-04-06", totalCalorieThatDay: 2000 },
            { date: "2025-04-07", totalCalorieThatDay: 1950 },
            { date: "2025-04-08", totalCalorieThatDay: 1900 },
            { date: "2025-04-09", totalCalorieThatDay: 2100 },
            { date: "2025-04-10", totalCalorieThatDay: 2050 }
            ],
            weight: [
            { date: "2025-04-01", weight: 78 },
            { date: "2025-04-04", weight: 77.5 },
            { date: "2025-04-07", weight: 77.2 },
            { date: "2025-04-10", weight: 77 }
            ],
            streaks: [
            { date: "2025-04-01", type: "met_goal" },
            { date: "2025-04-02", type: "missed_goal" },
            { date: "2025-04-03", type: "met_goal" },
            { date: "2025-04-04", type: "met_goal" },
            { date: "2025-04-05", type: "missed_goal" },
            { date: "2025-04-06", type: "met_goal" },
            { date: "2025-04-07", type: "met_goal" },
            { date: "2025-04-08", type: "met_goal" },
            { date: "2025-04-09", type: "missed_goal" },
            { date: "2025-04-10", type: "met_goal" }
            ]
        }
        }
    ];


const AdminPanel = () => {
    const [accounts, setAccounts] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", password: "" });

    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem("Accounts")) || [];
        setAccounts(storedAccounts);
        console.log(dummyAccounts)
    }, []);

    const addingDummyAcc = () => {
        const accounts = JSON.parse(localStorage.getItem("Accounts")) || [];
        const updatedData = [...accounts, ...dummyAccounts]
        localStorage.setItem("Accounts", JSON.stringify(updatedData));
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">👨‍💻 Admin Dashboard</h1>

            <button onClick={() => addingDummyAcc()}>Add dummy accounts</button>

            {/* Users Table */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                <thead className="bg-green-600 text-white">
                    <tr>
                    <th className="text-left px-6 py-3">ID</th>
                    <th className="text-left px-6 py-3">Username</th>
                    <th className="text-left px-6 py-3">Password</th>
                    <th className="text-left px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.length > 0 ? (
                    accounts
                        .filter((acc) => acc.username !== "admin")
                        .map((acc) => (
                        <tr
                            key={acc.id}
                            className="border-b hover:bg-gray-50 transition duration-200"
                        >
                            <td className="px-6 py-4">{acc.id}</td>
                            <td className="px-6 py-4">{acc.username}</td>
                            <td className="px-6 py-4">{acc.password}</td>
                            <td className="px-6 py-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                    <tr>
                        <td
                        colSpan="4"
                        className="text-center text-gray-500 py-6 px-4"
                        >
                        No users found.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
