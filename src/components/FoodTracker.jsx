import { Pie, PieChart} from "recharts";
import { useEffect, useState } from "react";

const FoodTracker = () => {
    const [trackedFood, setTrackedFood] = useState([])
    const [sumNut, setSumNut] = useState({
        protein: 0,
        fat: 0,
        carbs: 0,
    })

    useEffect(() => {
        const sampledata = localStorage.getItem("CalorieData")
        const parsedData = sampledata ? JSON.parse(sampledata) : []

        setTrackedFood(parsedData)
        
        const total = parsedData.reduce(
            (acc,item) => ({
                protein: acc.protein + item.protein,
                fat: acc.fat + item.fat,
                carbs: acc.carbs + item.carbs,
            }),
            { protein: 0, fat: 0, carbs: 0 }
        )

        setSumNut(total)
    }, [])


    return(
        <div>
            {trackedFood.length === 0 && <p>No food tracked yet...</p>}
            {trackedFood.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded shadow">
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Protein:</strong> {item.protein}%</p>
                    <p><strong>Fat:</strong> {item.fat}%</p>
                    <p><strong>Carbs:</strong> {item.carbs}%</p>
                </div>
            ))}

            <button onClick={() => console.log(sumNut)}>test</button>
        </div>
    );
};


export default FoodTracker;