import { Link } from "react-router-dom";
import MyNavbar from "./navBar";
import Target from '../image/target.jpg'


function SmartNutrition() {
    return (
        
        <div className="guide-container">
            <MyNavbar/>
            <div className="guide-wrapper">
                <header className="guide-header">
                    <h1>Your Guide to Smart Nutrition</h1>
                    <p>
                        Understanding calories and how your body uses them is the first
                        step toward achieving your health goals.
                    </p>
                </header>

                <section className="guide-section">
                    <h2>What is a Calorie?</h2>
                    <div className="calorie-card">
                        <div className="calorie-text">
                            <p>
                                A calorie is a unit of energy. Specifically, it's the amount of energy
                                needed to raise the temperature of 1 kilogram of water by 1 degree Celsius.
                            </p>
                            <p>
                                When we talk about food calories, we're actually talking about kilocalories (kcal).
                                One food calorie equals 1,000 regular calories.
                            </p>
                        </div>
                        <div className="energy-unit">
                            <img src={Target} alt="Energy Unit" className="energy-icon" />
                            <p>Energy Unit</p>
                        </div>
                    </div>
                </section>

                <section className="tdee-section">
                    <h2>Understanding TDEE</h2>
                    <div className="tdee-card">
                        <p>
                            Total Daily Energy Expenditure (TDEE) is the total number of
                            calories your body burns in a day. It’s made up of several
                            components:
                        </p>
                        <div className="tdee-donut">
                            <div className="tdee-donut-center">
                                <span>BMR 55%<br />
                                    NEAT 20%<br />
                                    Exercise 15%<br />
                                    TEF 10%
                                </span>
                            </div>
                        </div>
                        <ul className="tdee-visual-list">
                            <li><strong>BMR:</strong> Calories your body burns at rest.</li>
                            <li><strong>NEAT:</strong> Daily movement like walking, fidgeting, standing.</li>
                            <li><strong>Exercise Activity:</strong> Intentional exercise and sports.</li>
                            <li><strong>TEF:</strong> Digestion and food processing calories.</li>
                        </ul>
                    </div>
                </section>

                <section className="neat-section">
                    <h2>The Power of NEAT</h2>
                    <div className="neat-card">
                        <p>
                            NEAT can vary significantly and make a big difference in your daily calorie burn. Here are some common activities:
                        </p>

                        <div className="neat-subcard-container">
                            <div className="neat-subcard">
                                <h3>Daily Movements</h3>
                                <ul className="neat-list">
                                    <li className="green1">Walking to work</li>
                                    <li className="green2">Taking the stairs</li>
                                    <li className="green3">Shopping</li>
                                    <li className="green4">Household chores</li>
                                </ul>
                            </div>

                            <div className="neat-subcards">
                                <h3>Workplace Activity</h3>
                                <ul className="neat-list">
                                    <li className="green1">Standing desk usage</li>
                                    <li className="green2">Walking meetings</li>
                                    <li className="green3">Fidgeting</li>
                                    <li className="green4">Taking breaks to move</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="guide-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-card">
                        <h3>How long until I see results?</h3>
                        <p>
                            Most people see changes in 4–6 weeks with consistent tracking and
                            exercise. Expect 1–2 pounds lost per week.
                        </p>
                    </div>
                    <div className="faq-card">
                        <h3>What is BMR and how is it calculated?</h3>
                        <p>
                            BMR is the number of calories burned at rest. It's calculated
                            based on age, weight, height, and gender using the
                            Harris-Benedict formula.
                        </p>
                    </div>
                    <div className="faq-card">
                        <h3>Should I eat back exercise calories?</h3>
                        <p>
                            It depends. If losing weight, don't eat all of them back. For
                            maintenance or muscle gain, consider eating them back based on
                            progress.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SmartNutrition;

