import './App.css';
import './style/SmartNutrition.css'
import { Route, Routes, Link } from 'react-router-dom';
import SearchRecipe from './components/mealSearch';
import LoginPage from './components/LoginPage';
import DashBoard from './components/Dashboard';
import NotFound from './components/NotFound';
import RegisterPage from './components/RegisterPage';
import UpdateHealthGoal from './components/UpdateHealthGoal';
import LandingPage from './components/LandingPage';
import SmartNutrition from './components/SmartNutritionGuide';
import AnalyticsDashboard from './components/test';

function App() {
  //LANDING PAGE
  return (
    <div className="App">
      {/* <LandingPage /> */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/search' element={<SearchRecipe />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/updategoal' element={<UpdateHealthGoal />} />
        <Route path='/smartnutrition' element={<SmartNutrition />} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/test' element={<AnalyticsDashboard />}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;

