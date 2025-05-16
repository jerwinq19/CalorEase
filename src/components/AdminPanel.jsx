import { useState, useEffect } from "react";

// dummy data

const dummyAccounts = [
    {
      "id": "a1b2c3d4e5f67890g",
      "username": "lisa_eats_clean",
      "password": "pass1234",
      "weight": 58,
      "targetWeight": 52,
      "timeFrame": 12,
      "activityLevel": "Moderate",
      "dietPref": "Vegan",
      "gender": "Female",
      "age": 25,
      "height": 165,
      "eatenFood": [],
      "analytics": {
        "calories": [
          { "date": "2025-04-01", "totalCalorieThatDay": 1600 },
          { "date": "2025-04-02", "totalCalorieThatDay": 1500 },
          { "date": "2025-04-03", "totalCalorieThatDay": 1700 },
          { "date": "2025-04-04", "totalCalorieThatDay": 1400 },
          { "date": "2025-04-05", "totalCalorieThatDay": 1650 },
          { "date": "2025-04-06", "totalCalorieThatDay": 1550 },
          { "date": "2025-04-07", "totalCalorieThatDay": 1450 },
          { "date": "2025-04-08", "totalCalorieThatDay": 1500 },
          { "date": "2025-04-09", "totalCalorieThatDay": 1600 },
          { "date": "2025-04-10", "totalCalorieThatDay": 1520 },
          { "date": "2025-04-11", "totalCalorieThatDay": 1480 }
        ],
        "weight": [
          { "date": "2025-04-01", "weight": 58 },
          { "date": "2025-04-04", "weight": 57.8 },
          { "date": "2025-04-07", "weight": 57.5 },
          { "date": "2025-04-10", "weight": 57.2 },
          { "date": "2025-04-13", "weight": 56.9 }
        ],
        "streaks": [
          { "date": "2025-04-01", "streak": 1 },
          { "date": "2025-04-02", "streak": 1 },
          { "date": "2025-04-03", "streak": 0 },
          { "date": "2025-04-04", "streak": 1 },
          { "date": "2025-04-05", "streak": 1 },
          { "date": "2025-04-06", "streak": 0 },
          { "date": "2025-04-07", "streak": 1 },
          { "date": "2025-04-08", "streak": 1 },
          { "date": "2025-04-09", "streak": 1 },
          { "date": "2025-04-10", "streak": 0 }
        ]
      }
    },
    {
      "id": "z9y8x7w6v5u4t3r2q",
      "username": "john_fit",
      "password": "securePass789",
      "weight": 82,
      "targetWeight": 75,
      "timeFrame": 8,
      "activityLevel": "Active",
      "dietPref": "Balanced",
      "gender": "Male",
      "age": 30,
      "height": 180,
      "eatenFood": [],
      "analytics": {
        "calories": [
          { "date": "2025-04-01", "totalCalorieThatDay": 2200 },
          { "date": "2025-04-02", "totalCalorieThatDay": 2300 },
          { "date": "2025-04-03", "totalCalorieThatDay": 2100 },
          { "date": "2025-04-04", "totalCalorieThatDay": 2400 },
          { "date": "2025-04-05", "totalCalorieThatDay": 2250 },
          { "date": "2025-04-06", "totalCalorieThatDay": 2150 },
          { "date": "2025-04-07", "totalCalorieThatDay": 2350 },
          { "date": "2025-04-08", "totalCalorieThatDay": 2200 },
          { "date": "2025-04-09", "totalCalorieThatDay": 2300 },
          { "date": "2025-04-10", "totalCalorieThatDay": 2100 },
          { "date": "2025-04-11", "totalCalorieThatDay": 2400 }
        ],
        "weight": [
          { "date": "2025-04-01", "weight": 82 },
          { "date": "2025-04-04", "weight": 81.5 },
          { "date": "2025-04-07", "weight": 81 },
          { "date": "2025-04-10", "weight": 80.3 },
          { "date": "2025-04-13", "weight": 79.7 }
        ],
        "streaks": [
          { "date": "2025-04-01", "streak": 1 },
          { "date": "2025-04-02", "streak": 1 },
          { "date": "2025-04-03", "streak": 1 },
          { "date": "2025-04-04", "streak": 1 },
          { "date": "2025-04-05", "streak": 0 },
          { "date": "2025-04-06", "streak": 1 },
          { "date": "2025-04-07", "streak": 1 },
          { "date": "2025-04-08", "streak": 0 },
          { "date": "2025-04-09", "streak": 1 },
          { "date": "2025-04-10", "streak": 1 }
        ]
      }
    },
    {
      "id": "p2o3i4u5y6t7r8e9w",
      "username": "maya_health",
      "password": "healthypass456",
      "weight": 70,
      "targetWeight": 65,
      "timeFrame": 10,
      "activityLevel": "Lightly Active",
      "dietPref": "Keto",
      "gender": "Female",
      "age": 28,
      "height": 170,
      "eatenFood": [],
      "analytics": {
        "calories": [
          { "date": "2025-04-01", "totalCalorieThatDay": 1900 },
          { "date": "2025-04-02", "totalCalorieThatDay": 2000 },
          { "date": "2025-04-03", "totalCalorieThatDay": 1800 },
          { "date": "2025-04-04", "totalCalorieThatDay": 1950 },
          { "date": "2025-04-05", "totalCalorieThatDay": 1850 },
          { "date": "2025-04-06", "totalCalorieThatDay": 1750 },
          { "date": "2025-04-07", "totalCalorieThatDay": 1900 },
          { "date": "2025-04-08", "totalCalorieThatDay": 2000 },
          { "date": "2025-04-09", "totalCalorieThatDay": 1950 },
          { "date": "2025-04-10", "totalCalorieThatDay": 1850 },
          { "date": "2025-04-11", "totalCalorieThatDay": 1800 }
        ],
        "weight": [
          { "date": "2025-04-01", "weight": 70 },
          { "date": "2025-04-04", "weight": 69.7 },
          { "date": "2025-04-07", "weight": 69.2 },
          { "date": "2025-04-10", "weight": 68.5 },
          { "date": "2025-04-13", "weight": 67.8 }
        ],
        "streaks": [
          { "date": "2025-04-01", "streak": 1 },
          { "date": "2025-04-02", "streak": 0 },
          { "date": "2025-04-03", "streak": 1 },
          { "date": "2025-04-04", "streak": 1 },
          { "date": "2025-04-05", "streak": 1 },
          { "date": "2025-04-06", "streak": 0 },
          { "date": "2025-04-07", "streak": 1 },
          { "date": "2025-04-08", "streak": 1 },
          { "date": "2025-04-09", "streak": 0 },
          { "date": "2025-04-10", "streak": 1 }
        ]
      }
    },
    {
      "id": "k5j4h3g2f1d9s8a7z",
      "username": "danny_run",
      "password": "runHardPass",
      "weight": 78,
      "targetWeight": 72,
      "timeFrame": 6,
      "activityLevel": "Very Active",
      "dietPref": "Paleo",
      "gender": "Male",
      "age": 22,
      "height": 178,
      "eatenFood": [],
      "analytics": {
        "calories": [
          { "date": "2025-04-01", "totalCalorieThatDay": 2500 },
          { "date": "2025-04-02", "totalCalorieThatDay": 2400 },
          { "date": "2025-04-03", "totalCalorieThatDay": 2600 },
          { "date": "2025-04-04", "totalCalorieThatDay": 2300 },
          { "date": "2025-04-05", "totalCalorieThatDay": 2550 },
          { "date": "2025-04-06", "totalCalorieThatDay": 2450 },
          { "date": "2025-04-07", "totalCalorieThatDay": 2650 },
          { "date": "2025-04-08", "totalCalorieThatDay": 2500 },
          { "date": "2025-04-09", "totalCalorieThatDay": 2400 },
          { "date": "2025-04-10", "totalCalorieThatDay": 2600 },
          { "date": "2025-04-11", "totalCalorieThatDay": 2300 }
        ],
        "weight": [
          { "date": "2025-04-01", "weight": 78 },
          { "date": "2025-04-04", "weight": 77.2 },
          { "date": "2025-04-07", "weight": 76.5 },
          { "date": "2025-04-10", "weight": 75.7 },
          { "date": "2025-04-13", "weight": 74.9 }
        ],
        "streaks": [
          { "date": "2025-04-01", "streak": 1 },
          { "date": "2025-04-02", "streak": 1 },
          { "date": "2025-04-03", "streak": 1 },
          { "date": "2025-04-04", "streak": 1 },
          { "date": "2025-04-05", "streak": 1 },
          { "date": "2025-04-06", "streak": 1 },
          { "date": "2025-04-07", "streak": 1 },
          { "date": "2025-04-08", "streak": 1 },
          { "date": "2025-04-09", "streak": 1 },
          { "date": "2025-04-10", "streak": 1 }
        ]
      }
    },
    {
      "id": "x1c2v3b4n5m6l7k8j",
      "username": "anna_yoga",
      "password": "namaste123",
      "weight": 63,
      "targetWeight": 60,
      "timeFrame": 14,
      "activityLevel": "Sedentary",
      "dietPref": "Vegetarian",
      "gender": "Female",
      "age": 24,
      "height": 168,
      "eatenFood": [],
      "analytics": {
        "calories": [
          { "date": "2025-04-01", "totalCalorieThatDay": 1700 },
          { "date": "2025-04-02", "totalCalorieThatDay": 1600 },
          { "date": "2025-04-03", "totalCalorieThatDay": 1500 },
          { "date": "2025-04-04", "totalCalorieThatDay": 1650 },
          { "date": "2025-04-05", "totalCalorieThatDay": 1750 },
          { "date": "2025-04-06", "totalCalorieThatDay": 1550 },
          { "date": "2025-04-07", "totalCalorieThatDay": 1600 },
          { "date": "2025-04-08", "totalCalorieThatDay": 1500 },
          { "date": "2025-04-09", "totalCalorieThatDay": 1700 },
          { "date": "2025-04-10", "totalCalorieThatDay": 1600 },
          { "date": "2025-04-11", "totalCalorieThatDay": 1550 }
        ],
        "weight": [
          { "date": "2025-04-01", "weight": 63 },
          { "date": "2025-04-04", "weight": 62.7 },
          { "date": "2025-04-07", "weight": 62.4 },
          { "date": "2025-04-10", "weight": 62.1 },
          { "date": "2025-04-13", "weight": 61.8 }
        ],
        "streaks": [
          { "date": "2025-04-01", "streak": 1 },
          { "date": "2025-04-02", "streak": 0 },
          { "date": "2025-04-03", "streak": 1 },
          { "date": "2025-04-04", "streak": 1 },
          { "date": "2025-04-05", "streak": 0 },
          { "date": "2025-04-06", "streak": 0 },
          { "date": "2025-04-07", "streak": 1 },
          { "date": "2025-04-08", "streak": 1 },
          { "date": "2025-04-09", "streak": 0 },
          { "date": "2025-04-10", "streak": 1 }
        ]
      }
    }
  ]
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
