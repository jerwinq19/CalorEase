//FOOD CARD
import axios from "axios";
import { useState } from "react";
import '../style/modal.css'
import Modal from "../modal/modal";
import Swal from "sweetalert2";

const RecipeCard = ({name, image, id, idx}) => {

    const [showModal, setShowModal] = useState(false);
    const [recipeInfo, setRecipeInfo] = useState(null);

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
        
            const mealCalorie = response.data;
        
            const allAccounts = JSON.parse(localStorage.getItem('Accounts')) || [];
            const currentUserId = localStorage.getItem('CurrentUserId');
        
            const currentUserIndex = allAccounts.findIndex(user => user.id === currentUserId);
        
            if (currentUserIndex !== -1) {
                const currentUser = allAccounts[currentUserIndex];
            
                // Check if meal already exists
                const alreadyAdded = currentUser.eatenFood.some(meal => meal.id === mealCalorie.id);
            
                if (alreadyAdded) {
                    Swal.fire({
                    title: "Already Added!",
                    text: `${mealCalorie.title} is already in your list.`,
                    icon: "info"
                    });
                    return;
                }
            
                // If not added yet, push the new meal
                const newMeal = {
                    id: mealCalorie.id,
                    name: mealCalorie.title,
                    kcal: mealCalorie.nutrition.nutrients[0].amount
                };
            
                currentUser.eatenFood.push(newMeal);
            
                // Save back to localStorage
                localStorage.setItem('Accounts', JSON.stringify(allAccounts));
            
                Swal.fire({
                    title: "Calorie Added!",
                    text: `${mealCalorie.title} is added!`,
                    icon: "success"
                });
            }
        } catch (error) {
            console.error("Error adding calorie:", error);
            Swal.fire({
            title: "Error",
            text: "Something went wrong while adding the meal.",
            icon: "error"
            });
        }
    };
    

    // return
    return(
        <div>
            <div className="flex flex-col justify-between shadow-lg rounded overflow-hidden h-[350px] w-full max-w-sm">
                <img
                    src={image}
                    alt={name}
                    onError={(err) => {
                    err.target.onerror = null;
                    err.target.src = "https://placehold.co/600x400";
                    console.log(`This image has error: ${name}`);
                    }}
                    className="h-48 w-full object-cover"
                />

                <div className="flex flex-col justify-between flex-grow px-5 py-4">
                    <h2 className="text-xl mb-2 text-start">{name}</h2>
                    
                    <span className="flex justify-between">
                        <button className="bg-blue-500 text-white px-1 py-2 rounded" onClick={() => AddtoCalorie(id)}>
                            Add to Tracker ✅
                        </button>

                        <button className="bg-green-500 text-white px-1 py-2 rounded" onClick={() => ViewRecipe(id)}>
                            View 🔎
                        </button>
                    </span>
                </div> 

            </div>

            {showModal && recipeInfo && (
                <Modal setShowModal={setShowModal}>
                
                    {/* Modal Content */}
                    <img
                        src={recipeInfo.image}
                        alt={recipeInfo.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                
                    <h1 className="text-2xl font-bold mb-2">{recipeInfo.title}</h1>
                    <h2 className="text-md font-semibold mb-2">Kcal: {recipeInfo.nutrition.nutrients[0].amount}</h2>
                    <h2 className="font-semibold text-lg mb-1">Ingredients:</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
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