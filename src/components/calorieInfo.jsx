//FOOD CARD
import axios from "axios";
import { useRef, useState } from "react";
import '../style/modal.css'
import Modal from "../modal/modal";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import { getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";


const RecipeCard = ({name, image, id, idx}) => {

    const [showModal, setShowModal] = useState(false);
    const [recipeInfo, setRecipeInfo] = useState(null);
    const db = getFirestore()


    const ViewRecipe = async (id) => {

        const cachedData = localStorage.getItem("CachedRecipe")
        var cachedRecipe = cachedData ? JSON.parse(cachedData) : []

        const existingIndex = cachedRecipe.findIndex(item => item.data.id === id);

        if (existingIndex !== -1) {
            setRecipeInfo(cachedRecipe[existingIndex].data);
            setShowModal(true);
            console.log("Loaded from cache:", cachedRecipe[existingIndex].data);
            return;
        }
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY}`)
            setRecipeInfo(response.data)
            setShowModal(true)
            console.log(response.data)

            const newCache = {  
                data: response.data,
                fetchedAt: new Date().toLocaleDateString(),
            };

            cachedRecipe.push(newCache)
            localStorage.setItem("CachedRecipe", JSON.stringify(cachedRecipe));
            
        } catch (err) {
            console.error(`Error fetching the recipe data... ${err}`)
        }        
    }

    const AddtoCalorie = async (id) => {
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY}`
            );
    
            const mealCalorie = response.data.nutrition.nutrients[0];
            const mealTitle = response.data.title;
    
            const CalorieData = {
                id: nanoid(),
                mealName: mealTitle,
                calorie: mealCalorie.amount,
                created_at: new Date().toLocaleTimeString(),
            };
    
            const user = auth.currentUser;  // <---- get current user immediately
    
            if (!user) {
                Swal.fire({
                    title: "No user is signed in",
                    text: "No user is currently signed in.",
                    timer: 1500,
                    icon: "error",
                });
                return;
            }
    
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
    
            if (!userSnap.exists()) {
                Swal.fire({
                    title: "Warning",
                    text: "No user data found",
                    timer: 2000,
                    icon: "error",
                });
                return;
            }
    
            const data = userSnap.data();
            const updatedEatenFood = Array.isArray(data.eatenfood) ? [...data.eatenfood] : [];
            updatedEatenFood.push(CalorieData);
    
            await updateDoc(userRef, { eatenfood: updatedEatenFood });
    
            Swal.fire({
                title: "Success",
                text: "Meal added to your calorie tracker!",
                timer: 1500,
                icon: "success",
            });
        } catch (error) {
            console.error("Error adding calorie:", error);
            Swal.fire({
                title: "Error",
                text: "Something went wrong while adding the meal.",
                icon: "error",
            });
        }
    };
    
    

    // return
    return(
        <div className="w-full max-w-sm mx-auto">
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-1 duration-300">
                {/* Image */}
                <div className="relative">
                    <img
                    src={image}
                    alt={name}
                    onError={(err) => {
                        err.target.onerror = null;
                        err.target.src = "https://placehold.co/600x400?text=No+Image";
                        console.log(`Image error: ${name}`);
                    }}
                    className="h-48 w-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-grow p-5">
                    {/* Title */}
                    <h2 className="text-gray-800 font-semibold text-base md:text-lg leading-tight mb-4 line-clamp-2">
                    {name}
                    </h2>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto">
                    <button
                        onClick={() => AddtoCalorie(id)}
                        className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2 rounded-full hover:bg-gray-200 transition"
                    >
                        Add to Tracker
                    </button>
                    <button
                        onClick={() => ViewRecipe(id)}
                        className="flex-1 bg-green-500 text-white text-sm font-medium py-2 rounded-full hover:bg-green-600 transition"
                    >
                        View Recipe
                    </button>
                    </div>
                </div>
            </div>



            {showModal && recipeInfo && (
                <Modal setShowModal={setShowModal}>
                <img
                    src={recipeInfo.image}
                    alt={recipeInfo.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h1 className="text-2xl font-bold mb-2 text-gray-800">{recipeInfo.title}</h1>
                <h2 className="text-md font-semibold mb-4 text-gray-700">
                    Calories: <span className="font-bold">{recipeInfo.nutrition.nutrients[0].amount} kcal</span>
                </h2>

                <h2 className="font-semibold text-lg text-gray-800 mb-2">Ingredients:</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    {recipeInfo.extendedIngredients.map((info, idx) => (
                    <li key={idx}>{info.original}</li>
                    ))}
                </ul>
                </Modal>
            )}
        </div>
        
    );
};

export default RecipeCard;