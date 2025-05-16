//FOOD SEARCH PAGE
import { useState, useEffect, useRef } from "react";
import '../style/recipeSearchStyle.css'
import axios from "axios";
import RecipeCard from "./calorieInfo";
import MyNavbar from "./navBar";

const PaginationMeals = ({totalPost, postPerPage, setCurrentPage}) => {
    let pages = []

    for(let i = 1; i <= Math.ceil(totalPost / postPerPage); i++){
        pages.push(i)
    }

    return(
        <div className="flex flex-wrap justify-center gap-2 mt-6">
            {pages.map((page, index) => (
                <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                    ${setCurrentPage === page 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-green-100 text-green-700 hover:bg-green-300 hover:text-white'}`}
                >
                {page}
                </button>
            ))}
        </div>
    );
}

// start
const SearchRecipe = () => {
    // hooks
    const [SearchInput, setSearchInput] = useState("")
    const [Recipes, setRecipes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)


    // calculations
    const lastIndex = currentPage * postPerPage
    const startIndex = lastIndex - postPerPage
    const currentPost = Recipes.slice(startIndex, lastIndex) 



    // handlers
    const formattedInput = (input) => {
        return input.trim().split(" ").join("+")
    }

    useEffect(() => {
        
    }, [])



    const FetchRecipe = async (query) => {

        if (!query) return; // returns when no input 
        
        const cacheKey = `recipe_${query.toLowerCase()}` // create a key
        const cached = localStorage.getItem(cacheKey) // access it to the local db to save api calls and prevent limits

        if (cached) {
            return setRecipes(JSON.parse(cached))
        }

        const formatInput = formattedInput(query)

        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${formatInput}&includeNutrition=true&number=40&apiKey=${process.env.REACT_APP_API_KEY}`)

            setRecipes(response.data.results)
            localStorage.setItem(cacheKey, JSON.stringify(response.data.results))

        } catch (err) {
            console.error(`Opss.. Error there must have been a error in fetching the Data. \n ${err}`)
        }
    }

    // generate random recipe
    useEffect(() => {
        const RandomRecipe = async () => {
            try {
                // hours
                const ONE_DAY = 24 * 60 * 60 * 1000
                const now = Date.now()

                // store last fetched
                const lastFetched = parseInt(localStorage.getItem("random_last_fetched") || 0)
                // create or load the local storage 
                const stored = localStorage.getItem("random_recipe");

                if (stored && (now - lastFetched < ONE_DAY)) {
                    const parsed = JSON.parse(stored);
                    setRecipes(parsed);
                    return;
                }

                // fetch the api 
                const response = await axios.get(`https://api.spoonacular.com/recipes/random?includeNutrition=true&number=60&apiKey=${process.env.REACT_APP_API_KEY}`)
                console.log(`recipe saved to the local storage...`, response.data.recipes)

                // append to the local storage
                setRecipes(response.data.recipes); // set to state

                // save to the local storage the loaded random recipes
                localStorage.setItem("random_recipe", JSON.stringify(response.data.recipes))
                localStorage.setItem("random_last_fetched", now.toString()) // set time


            } catch (ero) {
                console.error(`Error fetching api... ${ero}`)
            }
        };

        RandomRecipe();

    }, [])
    
    return (
        <>
            <MyNavbar />
            <div className="m-10">
                {/* search function */}
                <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0 max-w-xl w-full mx-auto mt-6">
                    <input 
                        type="text"
                        value={SearchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="p-3 bg-gray-100 flex-1 rounded-l-lg sm:rounded-l-lg sm:rounded-r-none rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition"
                        placeholder="Search Meal..."
                    />

                    <button
                        className="bg-green-500 text-white px-5 py-3 rounded-r-lg sm:rounded-l-none rounded-lg hover:bg-green-600 transition font-semibold"
                        onClick={() => FetchRecipe(SearchInput)}
                    >
                        Search
                    </button>
                </div>

                {Recipes && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-2 sm:px-0">
                        {currentPost.map((Meal, idx) => (
                        <RecipeCard
                            key={Meal.id}
                            image={Meal.image}
                            name={Meal.title}
                            id={Meal.id}
                            idx={idx}
                        />
                        ))}
                    </div>
                )}

                <PaginationMeals totalPost={Recipes.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage}/>

            </div>
            
        
        </>
    );
};

export default SearchRecipe;