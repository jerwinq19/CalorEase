import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import SearchRecipe from './components/mealSearch';
import LoginPage from './components/LoginPage';
import DashBoard from './components/Dashboard';
import NotFound from './components/NotFound';
import RegisterPage from './components/RegisterPage';
import UpdateHealthGoal from './components/UpdateHealthGoal';
import LandingPage from './components/LandingPage';


function App() {
  //LANDING PAGE
  return (
    <div className="App">
      {/* <LandingPage /> */}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/search' element={<SearchRecipe />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/updategoal' element={<UpdateHealthGoal />} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;

