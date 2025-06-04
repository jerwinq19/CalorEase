import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {app, auth} from "../firebase/firebase";
import Swal from "sweetalert2";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [weight, setWeight] = useState("");
    const [targetWeight, setTargetWeight] = useState("");
    const [timeFrame, setTimeFrame] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [dietPref, setDietPref] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const navigate = useNavigate()

    // instance of firebase db
    const db = getFirestore(app)

    const handleRegister = async () => {
        if (
            !username.trim() || !password.trim() ||
            weight === "" || targetWeight === "" || timeFrame === "" ||
            !activityLevel || !dietPref || !gender ||
            age === "" || height === ""
        )   {
            return Swal.fire({
                title: "Missing Input",
                text: "Please complete all fields before proceeding.",
                icon: "warning"
            });
        }
        

        try {
            const userCreds = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCreds.user

            // store user data
            await setDoc(doc(db, "users", user.uid), {
                email: email,
                username: username,
                weight: weight,
                target_weight: targetWeight,
                time_frame: timeFrame,
                activity_level: activityLevel,
                diet_pref: dietPref,
                sex: gender,
                height: height,
                age: age,
                eatenfood: [],
                user_analytics: [],
                added_meal_history: [],
            });
            console.log("success")
            console.log("Registered:", user.email);
        } catch (error) {
            console.error(error)
        }

        setUsername("");
        setPassword("");
        setWeight(0);
        setTargetWeight(0);
        setTimeFrame(0);
        setActivityLevel("");
        setDietPref("");
        setGender("");
        setAge(0);
        setHeight(0);

        Swal.fire({
            title: "Registered",
            text: "Successfully registered! Please log in.",
            icon: "success"
        });
        navigate("/")

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-50 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
                <div className="mb-6">
                    <Link to="/login" className="text-gray-600 hover:text-green-600 flex items-center font-medium">
                        <span className="mr-2 text-xl select-none">←</span> Back
                    </Link>
                </div>
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Join CalorEase</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm font-medium">
                    Email
                    <input
                        type="email"
                        placeholder="Email address"
                        className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>


                    <label className="text-sm font-medium">
                        Username
                        <input
                            type="text"
                            placeholder="Username"
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Password
                        <input
                            type="password"
                            placeholder="Password"
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Age
                        <input
                            type="number"
                            placeholder="Age"
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Height (cm)
                        <input
                            type="number"
                            placeholder="Height in cm"
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Weight (kg)
                        <input
                            type="number"
                            placeholder="Your weight"
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Target Weight (kg)
                        <input
                            type="number"
                            placeholder="Your target weight"
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                            value={targetWeight}
                            onChange={(e) => setTargetWeight(Number(e.target.value))}
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Timeframe (weeks)
                        <input
                            type="number"
                            placeholder="Weeks"
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(Number(e.target.value))}
                        />
                    </label>

                    <label className="text-sm font-medium">
                        Activity Level
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">Select activity level</option>
                            <option value="Sedentary">Sedentary</option>
                            <option value="Lightly active">Lightly active</option>
                            <option value="Moderately active">Moderately active</option>
                            <option value="Very active">Very active</option>
                            <option value="Extra active">Extra active</option>
                        </select>
                    </label>

                    <label className="text-sm font-medium md:col-span-2">
                        Dietary Preferences
                        <select
                            value={dietPref}
                            onChange={(e) => setDietPref(e.target.value)}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">Choose your preferences</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Keto">Keto</option>
                            <option value="Paleo">Paleo</option>
                            <option value="No preference">No preference</option>
                        </select>
                    </label>

                    <label className="text-sm font-medium md:col-span-2">
                        Gender
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">Choose your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition"
                        onClick={handleRegister}
                    >
                        Create Account
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
