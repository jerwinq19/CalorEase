import { useState } from "react";
import { CreateData } from "../utils/supaDB";

const RegisterPage = () => {
    const [FullName, setFullName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("");
    const [Height, setHeight] = useState("");
    const [Weight, setWeight] = useState("");
    const [Goal, setGoal] = useState("");

    const inputStyle = "p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400";

    const handleRegister = () => {

        const myData = {
            FullName: FullName,
            Password: Password,
            age: Age,
            gender: Gender,
            height: Height,
            weight: Weight,
            goal: Goal,
        }

        CreateData('users', myData)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Health Profile</h2>

                <div className="grid grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className={inputStyle} 
                        value={FullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        className={inputStyle} 
                        value={Password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className={inputStyle} 
                        value={ConfirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />

                    <input 
                        type="number" 
                        placeholder="Age" 
                        className={inputStyle} 
                        value={Age} 
                        onChange={(e) => setAge(e.target.value)} 
                    />

                    <select 
                        className={inputStyle} 
                        value={Gender} 
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <input 
                        type="number" 
                        placeholder="Height (cm)" 
                        className={inputStyle} 
                        value={Height} 
                        onChange={(e) => setHeight(e.target.value)} 
                    />

                    <input 
                        type="number" 
                        placeholder="Weight (kg)" 
                        className={inputStyle} 
                        value={Weight} 
                        onChange={(e) => setWeight(e.target.value)} 
                    />

                    <select 
                        className={`${inputStyle} col-span-2`} 
                        value={Goal} 
                        onChange={(e) => setGoal(e.target.value)}
                    >
                        <option value="">Goal</option>
                        <option value="Maintain weight">Maintain weight</option>
                        <option value="Lose weight">Lose weight</option>
                        <option value="Gain weight">Gain weight</option>
                    </select>
                </div>

                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 mt-6 rounded w-full" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
